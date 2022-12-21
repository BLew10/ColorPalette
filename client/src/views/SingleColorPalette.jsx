import React, { useReducer, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ColorBox from '../components/ColorBox'
import { genereatePalette } from '../components/colorHelpers'
import styles from '../styles/PaletteStyles'
import seederColor from '../seederColor'
import NavMenu from '../components/NavMenu'
import PaletteFooter from '../components/PaletteFooter'
import { withStyles } from '@material-ui/styles'




const SingleColorPalette = (props) => {
  const { paletteId, colorId } = useParams()
  const nav = useNavigate()
  const { passColorType, passLevel, format, classes, allPalettes} = props
  const [palette, setPalette] = useState(allPalettes.find(palette => palette.id === paletteId))
  const [shades, setShades] = useState([])
  const [generatedPalette, setGeneratedPalette] = useState(genereatePalette(palette));

  useEffect(() => {
    const curPalette = allPalettes.find(palette => palette.id === paletteId)
    setPalette(curPalette)
    setGeneratedPalette(genereatePalette(curPalette))
    gatherShades(genereatePalette(curPalette), colorId)
  }, [paletteId]);



  const gatherShades = (palette, colorToFilterBy) => {
    let shadesOfColor = [];
    let allColors = palette.colors
    for (const key in allColors) {
      shadesOfColor.push(...allColors[key].filter(shadeForColor => shadeForColor.id === colorToFilterBy));
    }
    setShades(shadesOfColor.slice(1))
  };


  return (
    <div className={classes.Palette}>
      <NavMenu passLevel={passLevel} passColorType={passColorType} showSlider={false} />
      <div className={classes.PaletteColors}>

        {shades.map(shade => <ColorBox id={shade.id} background={shade[format]} name={shade.name} key={shade.id} showFullPalette={false} luminance={shade.luminance} />)}
        <div className={classes.goBack} onClick={() => nav(`/palette/${paletteId}`)}> <span className={classes.backButton}>Go Back</span></div>
      </div>
      <PaletteFooter palette={palette} />

    </div>
  )
}

export default withStyles(styles)(SingleColorPalette)
