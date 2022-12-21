import React, { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom';
import styles from '../styles/PaletteNavFormStyles'
import { withStyles, withTheme } from '@material-ui/styles'
import PaletteNamePopUp from './PaletteNamePopUp';


const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));




const PaletteNavForm = (props) => {


  const { open, handleDrawerOpen, handleSubmit, handleChange, newPaletteName } = props


  return (
    <div >
      <CssBaseline />
      <AppBar position="fixed" open={open} className="w-full">

        <Toolbar>
          <div className='w-full flex justify-between items-center'>
            <div className='flex items-center'>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Create a New Palette
              </Typography>
            </div>
              <div className='flex [&>*]:mx-3 justify-between basis-1/4'>
              <PaletteNamePopUp  handleSubmit={handleSubmit} handleChange={handleChange} newPaletteName={newPaletteName}/>
                <Button variant='contained' type="submit" color="secondary" ><Link to="/dashboard" className='text-white'>Home</Link></Button>
              </div>
          </div>
        </Toolbar>

      </AppBar>
    </div>
  )
}

export default PaletteNavForm