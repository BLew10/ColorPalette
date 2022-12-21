import { palette } from '@mui/system'
import MiniPalette from '../components/MiniPalette'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import styles from "../styles/PaletteListStyles"
import axios from 'axios'

function filterPalettes(objects, id) {
    return objects.filter(object => {
        if (!object.PaletteUsers || !object.PaletteUsers["$values"]) {
            return false;
        }
        return object.PaletteUsers["$values"].some(value => value.UserId === id)
    });
}

  function filterNotUserPalettes(objects, id) {
    return objects.filter(object => {
      if (!object.PaletteUsers || !object.PaletteUsers["$values"]) {
        return false;
      }
     return !object.PaletteUsers["$values"].some(value => value.UserId === id) 
    });
  } 


const PaltteList = (props) => {
    const nav = useNavigate()

    const goToPalette = (id) => {
        nav(`/palette/${id}`)
    }

    const [user, setUser] = useState({})
    const { classes, palettes, setHasUpdated } = props
    console.log(palettes)
    const UserId = parseInt(window.sessionStorage.getItem("userId"))
    const [userPalettesDisplayed, setUserPalettesDisplayed] = useState(true)


    const [displayedPalettes, setDisplayedPalettes] = useState(filterPalettes(palettes, UserId))
    const [userPalettes, setUserPalettes] = useState(filterPalettes(palettes, UserId))
    const [notUserPalettes, setNotUserPalettes] = useState(filterNotUserPalettes(palettes, UserId))
    const triggerAction = (index, action) => {
        setHasUpdated(prev=>!prev)
        // let updatedNotUserPalettes = structuredClone(notUserPalettes)
        // let updatedUserPalettes = structuredClone(notUserPalettes)
        // updatedNotUserPalettes.push(userPalettes[index])
        // console.log(notUserPalettes)
        // console.log(userPalettes)
        // if (action === "add") {
        //     updatedUserPalettes.push(notUserPalettes[index])
        //     setUserPalettes(updatedUserPalettes)
        //     setNotUserPalettes(updatedNotUserPalettes.filter((item, idx) => idx !== index))
        // } else {
        //     updatedNotUserPalettes.push(userPalettes[index])
        //     setNotUserPalettes(updatedNotUserPalettes)
        //     setUserPalettes(updatedUserPalettes.filter((item, idx) => idx !== index))
        // }
    }




    useEffect(() => {
        let user = {
            id: window.sessionStorage.getItem("userId")
        }

        axios({
            url: `http://localhost:5029/api/loggedInUser/${user.id}`,
            method: "get",
            data: user,
            contentType: "application/json"
        })
            .then((res) => {

                setUser({ ...res.data })
            })
            .catch(err => {
                console.log(err)
            });

            userPalettesDisplayed ? setDisplayedPalettes([...filterPalettes(palettes, UserId)]) : setDisplayedPalettes([...filterNotUserPalettes(palettes, UserId)])

    }, [userPalettesDisplayed, userPalettes, notUserPalettes, palettes, setHasUpdated]);


    return (


        <div className={`${classes.root}`}>

            <div className={classes.container}>
                <nav className={classes.nav}>

                    <h1>Welcome to React Colors {user.firstName}</h1>
                    <Link to="/palette/new" className='text-white underline'>Create Palette</Link>
                </nav>
                <div className='flex w-2/3 mx-auto justify-around text-blue bg-white rounded p-3'>
                    <div onClick={() => setUserPalettesDisplayed(true)} className={`cursor-pointer ${userPalettesDisplayed && "font-bold scale-105"}`}>
                        Your Palletes
                    </div>
                    <div onClick={() => setUserPalettesDisplayed(false)} className={`cursor-pointer ${!userPalettesDisplayed && "font-bold"}`}>
                        All Palettes
                    </div>

                </div>
                <div className={`${classes.palettes} overflow-y-auto`}>
                    {displayedPalettes.length > 0 ? displayedPalettes.map((palette, idx) =>
                        <MiniPalette {...palette} handleClick={goToPalette} userPalettesDisplayed={userPalettesDisplayed} triggerAction={triggerAction} idx={idx} key={palette.id}/>)
                        :
                        <div className='text-white h-[90vh] flex items-center justify-center mx-auto w-full text-3xl'>
                            Please Create A Palette or Save an Existing!
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default withStyles(styles)(PaltteList)