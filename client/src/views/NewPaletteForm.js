import React, { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ValidatorForm } from 'react-material-ui-form-validator'
import { useNavigate } from 'react-router-dom';
import DraggableList from '../components/DraggableList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteNavFrom from '../components/PaletteNavForm';
import ColorPicker from '../components/ColorPicker';
import { Configuration, OpenAIApi } from "openai";
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const NewPaletteForm = (props) => {
  function getStringFromFirstBracket(string) {
    let index = string.indexOf("[");
    let lastIndex = string.indexOf("]");
    return string.substring(index, lastIndex + 1);
  }

  const nav = useNavigate()
  const { savePalette, allPalettes } = props
  const initalState = {
    hex: "#6969b5",
    hsl: { h: 240, s: 0.33724253950894234, l: 0.5609253500000001, a: 1 },
    hsv: { h: 240, s: 0.41769999999999996, v: 0.7090000000000001, a: 1 },
    oldHue: 240,
    rgb: { r: 105, g: 105, b: 181, a: 1 },
    source: "hsv"
  }
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [newPaletteColor, setNewPaletteColor] = useState(initalState)
  const [colors, setColors] = useState([...allPalettes[0].colors])
  const [newColorName, setNewColorName] = useState("")
  const [newPaletteName, setNewPaletteName] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const paletteIsFull = colors.length >= 20
  console.log(process.env.REACT_APP_API_KEY)
  const configuration = new Configuration({
    organization: "org-3fPHmekJ2gUQW7hcG1kJrpSW",
    apiKey: process.env.REACT_APP_API_KEY
    ,
  });
  const openai = new OpenAIApi(configuration);

  console.log(allPalettes)

  useEffect(() => {

    ValidatorForm.addValidationRule('uniqueColorName', value => colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()));
    ValidatorForm.addValidationRule('uniqueColor', value => colors.every(({ color }) => color !== newPaletteColor.hex));

    ValidatorForm.addValidationRule('uniquePaletteName', value => allPalettes.every(({ PaletteName }) => PaletteName.toLowerCase() !== value.toLowerCase()));

  }, [newColorName, colors, newPaletteColor, newPaletteName]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = (color) => {
    setNewPaletteColor(color)
  }
  const handleChange = (e) => {
    if (e.target.name === "newColorName") setNewColorName(e.target.value);
    else if (e.target.name === "newPaletteName") setNewPaletteName(e.target.value);
  }



  const addColor = (addedColor) => {
    const newColor = {
      color: addedColor.hex,
      name: newColorName
    }
    setColors([newColor, ...colors])
    setNewColorName("")
  }

  const handleSubmit = (emoji) => {

    const newPalette = {
      PaletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji,
      colors: JSON.stringify(colors),
      CreatorId: window.sessionStorage.getItem("userId")
    }

    savePalette(newPalette)

  }

  const removeColor = (colorIdx) => {
    let newListColors = colors.filter((color, idx) => idx !== colorIdx)
    setColors([...newListColors])
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  };

  const addRandomColor = () => {
    let allColors = allPalettes.map(p => p.colors).flat()
    let rand = Math.floor(Math.random() * allColors.length)
    setColors([...colors, allColors[rand]])
  }

  const clearPalette = () => {
    setColors([])
  }

  const aiGeneratedPalette = (style = "classic", number = 1) => {
    setAiLoading(true)
    openai.createCompletion({
      "model": "text-davinci-002",
      "prompt": `Please generate a ${style} palette as JSON with ${number} objects with key names as strings in double quotes and their names as "name" and "color", each containing a generated color name and hex code. Here's an example: [
        { "name": "red", "color": "#F44336" },
        { "name": "pink", "color": "#E91E63" },
        { "name": "purple", "color": "#9C27B0" },
        { "name": "deeppurple", "color": "#673AB7" },
        { "name": "indigo", "color": "#3F51B5" },
        { "name": "blue", "color": "#2196F3" },
        { "name": "lightblue", "color": "#03A9F4" },
        { "name": "cyan", "color": "#00BCD4" },
        { "name": "teal", "color": "#009688" },
        { "name": "green", "color": "#4CAF50" },
        { "name": "lightgreen", "color": "#8BC34A" },
        { "name": "lime", "color": "#CDDC39" },
        { "name": "yellow", "color": "#FFEB3B" },
        { "name": "amber", "color": "#FFC107" },
        { "name": "orange", "color": "#FF9800" },
        { "name": "deeporange", "color": "#FF5722" },
        { "name": "brown", "color": "#795548" },
        { "name": "grey", "color": "#9E9E9E" },
        { "name": "bluegrey", "color": "#607D8B" }
      ]
      
      `,
      "max_tokens": 1500
    }
    ).then(response => {
      let ai = JSON.parse(response.data.choices[0].text)
      setColors(ai.splice(0,number))
      setAiLoading(false)
    })
      .catch(err => console.log(err))

  }



  return (
    <Box sx={{ display: 'flex' }} className ="bg-gray-500 h-[100vh] w-[100%]">
      <PaletteNavFrom open={open} handleDrawerOpen={handleDrawerOpen} handleChange={handleChange} newPaletteName={newPaletteName} handleSubmit={handleSubmit} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        className={`h-full `}
      >
        <DrawerHeader className='bg-[#222]'>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon className='text-white' /> : <ChevronRightIcon className='text-white' />}
          </IconButton>
        </DrawerHeader>
        <div className={`flex flex-col items-center justify-center h-full bg-[#222]`}>
          <ColorPicker handleColorChange={handleColorChange} addRandomColor={addRandomColor} addColor={addColor} newColorName={newColorName} handleChange={handleChange} paletteIsFull={paletteIsFull} newPaletteColor={newPaletteColor} clearPalette={clearPalette} aiGeneratedPalette={aiGeneratedPalette} />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {!aiLoading ?
          <DraggableList colors={colors} removeColor={removeColor} onSortEnd={onSortEnd} axis="xy" /> :
          <Box className='flex flex-col w-full h-full items-center justify-center'>
            <CircularProgress />
            <div className='text-white'>Retreiving Your AI Generated Palette</div>
          </Box>
        }
      </Main>
    </Box>
  )
}

export default NewPaletteForm