import React, { useState, useReducer } from 'react';
import { withStyles } from '@material-ui/styles'
import { useNavigate, Link } from 'react-router-dom';

const styles = {
  nav: {
    display: 'flex',
    position: "absolute",
    top: "0",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100px',
    backgroundColor: '#222',
    color: '#fff',
    width: "100%"
  },
  navBrand: {
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: "50px"
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    marginRight: "50px"
  },
  navLink: {
    fontSize: '14px',
    textDecoration: 'none',
    color: 'inherit',
    cursor: "pointer",
    margin: '0 10px',
  },
  navLinkActive: {
    color: '#999',
  },
};

function MainNavBar(props) {
  const {classes} = props
  const nav = useNavigate()

  const logout = () => {
    window.sessionStorage.setItem("userId", null)
    nav("/")
  }

  return (
    <nav className={classes.nav}>
      <div className={`cursor-pointer ${classes.navBrand}`} onClick={()=>nav("/dashboard")}>
        React Colors
      </div>
      <div className={classes.navLinks}>
        <a href="#" className={classes.navLink}>
        <Link to="/palette/new" className='text-white hover:font-bold hover:underline '>Create Palette</Link>
        </a>
        <div  onClick={()=>logout()} className={`${classes.navLink} hover:font-bold hover:underline`}>
        Logout
        </div>
      </div>
    </nav>
  );
}

export default withStyles(styles)(MainNavBar)
