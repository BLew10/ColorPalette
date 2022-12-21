import React, { useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';




const NavMenu = (props) => {
  const { passLevel, passColorType, showSlider } = props
  const [snack, setSnack] = useState(false)
  const reducer = (state, action) => {
    switch (action.type) {
      case 'set':
        return { level: action.e.target.value }
      default:
        throw new Error();
    }
  }
  const options = [
    { value: 'hex', label: 'HEX #ffffff' },
    { value: 'rgb', label: 'rgb (255, 255, 255)' },
    { value: 'rgba', label: 'rgba (255, 255, 255, 1.0)' }

  ]
  const [colorType, setColorType] = useState(options[0].value)

  const [state, dispatch] = useReducer(reducer, { level: 500 })

  const SnackBar = (e) => {
    setSnack(true)
    setColorType(e.target.value)
    passColorType(e.target.value)
    setTimeout(() => setSnack(false), 1500);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );










  return (
<div className={`h-[12vh] static flex items-center flex ${showSlider && "justify-between lg:w-1/2 mx-auto"}`}>
  <Link to="/dashboard" className={`${showSlider ? "lg:w-1/10" : "lg:w-1/2"}`}>ColorPallete</Link>
  <div className={`flex ${showSlider ? "justify-around" : "justify-between lg:justify-end"} items-center  my-10 w-full`}>
    {showSlider && <>
      <p className=''>Level: {state.level}</p>
      <div className='slider'>
        <Box width={300} className="mx-auto">
          <Slider defaultValue={500} step={100} min={100} max={900} aria-label="Default" valueLabelDisplay="auto" className="" onChange={(e) => { dispatch({ type: "set", e }); passLevel(e.target.value) }} />
        </Box>
      </div>
    </>}
  </div>
  <Box sx={{ minWidth: 120 }}>
    <Select value={colorType} onChange={(e) => SnackBar(e)}>
      {options.map((option) => <MenuItem value={option.value}>{option.label}</MenuItem>)}
    </Select>
  </Box>
  <Snackbar
    open={snack}
    autoHideDuration={6000}
    onClose={() => setSnack(false)}
    message={`Set to ${colorType}`}
    action={action}
  />
</div>
  );
}

export default NavMenu