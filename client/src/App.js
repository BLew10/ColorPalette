import React, { useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './custom.css';
import Palette from "./views/Palette";
import SingleColorPalette from './views/SingleColorPalette';
import PaletteList from './views/PaletteList';
import Home from './views/Home';
import NewPaletteForm from './views/NewPaletteForm';
import axios from 'axios'



const App = () => {
  const [level, setLevel] = useState(500);
  const nav = useNavigate()
  const [palettes, setPalettes] = useState([])
  const [format, setFormat] = useState("hex")
  const [hasUpdated, setHasUpdated] = useState(false)
  const passLevel = (newLevel) => {setLevel(newLevel);
  }
  const passColorType = (format) => {
    setFormat(format)
  }

  const savePalette = (newPalette) => {
    axios({
      url: "http://localhost:5029/api/palette/create",
      method: "post",
      data: newPalette,
      contentType: "application/json"
    })
      .then((res) => {
        setHasUpdated(prev=> !prev)
        nav(`/dashboard`)
      })
      .catch(err => { console.log(err)
      });

  }


  useEffect(() => {
    let loggedIn = window.sessionStorage.getItem("userId")
      axios.get(`http://localhost:5029/api/getallPalettes`)
      .then(res => {

        let storedPalettes = JSON.parse(res.data)["$values"]

        for(let palette of storedPalettes){
          palette.colors = JSON.parse(palette.colors)
        }

        setPalettes([...storedPalettes])

      }
        )
      .catch(err => console.log(err))
    
  }, [hasUpdated]);


  
  return (
    <div className=''>
      <Routes>
        <Route exact path="/" element={<Home />} />;
        <Route exact path="/dashboard" element={<PaletteList palettes={palettes} setHasUpdated={setHasUpdated} />} />;
        <Route exact path="/palette/:id" element={<Palette level={level} format={format} passLevel={passLevel} passColorType={passColorType} allPalettes={palettes} />}/>
        <Route exact path="/palette/new" element={<NewPaletteForm level={level} format={format} passLevel={passLevel} passColorType={passColorType} savePalette={savePalette} allPalettes={palettes} setHasUpdated={setHasUpdated} />}/>
        <Route exact path="/palette/:paletteId/:colorId" element={<SingleColorPalette level={level} format={format} passLevel={passLevel} passColorType={passColorType}  allPalettes={palettes} />}/>
      </Routes>
    </div>

  );
}

export default App
