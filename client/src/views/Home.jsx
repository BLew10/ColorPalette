import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Login from '../components/Login';
import {
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom"
import { withStyles, keyframes } from '@material-ui/styles'
import styles from '../styles/HomeStyles'
import logo from "../styles/img/splash.png"

import "../styles/converge.css"





const Home = (props) => {
    const { classes } = props
    const navigate = useNavigate()

    const [registered, setRegistered] = useState(true)
    const [showName, setShowName] = useState(false)
    const [showSplash, setShowSplash] = useState(true)
    const [clearColorBoxes, setClearColorBoxes] = useState(false)
    const colorArr = ["FF0000", "00FF00", "0000FF", "FFFF00", "800080"]
    const [currIndex, setCurrIndex] = useState(0)
    function rotateColors() {
        setCurrIndex(prev => (prev + 1) % (colorArr.length - 1));

    }
    useEffect(() => {
        const interval = setInterval(rotateColors, 1500);
        setTimeout(() => {
            setShowName(true)
        }, 2700)
        setTimeout(() => {
            setClearColorBoxes(true)
        }, 2900)
        return () => clearInterval(interval);
    }, []);








    return showSplash ? (
        <div className='bg-black h-[100vh] w-[100vw] flex flex-col items-center justify-center'>
            <div className='center w-1/2'>
                <div className={`name  mx-auto w-fit  flex flex-col items-center justify-center w-[50%]  ${showName && "show  font-bold animate-pulse"}`}> <span className="text-white z-10  text-6xl ">Palette Genie</span>
                    <span className="text-white z-10 underline text-md cursor-pointer" onClick={()=>setShowSplash(false)}>Click Here to Login/Register</span>

                    <img src={`https://img.icons8.com/ios-filled/100/${colorArr[currIndex]}/splash.png`} className={` splash  ${showName && "show"} ${classes.splashOne}`} />
                    <img src={`https://img.icons8.com/ios-filled/100/${colorArr[currIndex]}/splash.png`} className={` splash ${showName && "show"} ${classes.splashTwo}`} />
                    <img src={`https://img.icons8.com/ios-filled/100/${colorArr[currIndex]}/splash.png`} className={` splash  ${showName && "show"} ${classes.splashThree}`} />
                    <img src={`https://img.icons8.com/ios-filled/100/${colorArr[currIndex]}/splash.png`} className={` splash  ${showName && "show"} ${classes.splashFour}`} />
                    <img src={`https://img.icons8.com/ios-filled/100/${colorArr[currIndex]}/splash.png`} className={` splash  ${showName && "show"} ${classes.splashFive}`} />
                </div>
                <div className={`corner-div-red ${clearColorBoxes && "show"}`}></div>
                <div className={`corner-div-green ${clearColorBoxes && "show"}`}></div>
                <div className={`corner-div-blue ${clearColorBoxes && "show"}`}></div>
                <div className={`corner-div-yellow ${clearColorBoxes && "show"}`}></div>
                <div className={`corner-div-purple ${clearColorBoxes && "show"}`}></div>
            </div>
        </div >

    )
        :
        (
            <div className={` ${classes.root} w-[100vw] h-[100vh] overflow-hidden `}>
                <div className={` rounded-xl mx-auto my-20 w-[50%] bg-black border-4 border-white`}>

                    <div className={`mx-auto  py-3 px-5 rounded-xl`}>
                        <h1 className='p-4 h-full  text-white font-bold  basis-1/4 font-bold text-center my-3 text-5xl '>Palette Genie</h1>

                        <div className='w-full font-bold '>
                            <button onClick={() => setRegistered(true)} className={`p-3  mx-0 w-1/2 rounded-l-lg bg-white border-2 border-slate-300 border-r-0 ${registered ? "  bg-[#252afd] text-white" : ""}`}>Login</button>
                            <button onClick={() => setRegistered(false)} className={`p-3 w-1/2 mx-0 rounded-r-lg bg-white border-2 border-slate-300 border-l-0 ${!registered ? "   bg-[#252afd] text-white" : ""}`}>Sign Up</button>
                        </div>
                        {registered ? <Login />
                            : <RegistrationForm />
                        }
                    </div>
                </div>
            </div>
        )
}

export default withStyles(styles)(Home)