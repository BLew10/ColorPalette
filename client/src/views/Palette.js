import { palette } from '@mui/system'
import React, { useReducer, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ColorBox from '../components/ColorBox'
import { genereatePalette } from '../components/colorHelpers'
import styles from '../styles/PaletteStyles'
import seederColor from '../seederColor'
import NavMenu from '../components/NavMenu'
import PaletteFooter from '../components/PaletteFooter'
import { withStyles } from '@material-ui/styles'


function Palette(props) {
  const { id } = useParams()
  const { passColorType, passLevel, level, format, classes, allPalettes } = props
  console.log(allPalettes)
  // const { paletteName, emoji } = props.palette
  const [palette, setPalette] = useState(allPalettes.find(palette => palette.id === id))
  console.log(palette)

  useEffect(() => {
    const curPalette = allPalettes.find(palette => palette.id === id)
    setPalette(curPalette)
  }, [id])


  const generatedPalette = genereatePalette(palette)
  const colorBoxes = generatedPalette.colors[level]

  return (
    <div className={classes.Palette}>
      <NavMenu passLevel={passLevel} passColorType={passColorType} showSlider={true} />
      <div className={classes.PaletteColors}>

        {colorBoxes.map(color => <ColorBox colorId={color.id} paletteId={id} background={color[format]} name={color.name} key={color.id} showFullPalette={true} luminance={color.luminance} />)}
      </div>
      <PaletteFooter palette={palette} />

    </div>
  )
}

export default withStyles(styles)(Palette)
