import MiniPalette from '../components/MiniPalette'
import MainNavBar from '../components/MainNavBar'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const UserId = parseInt(window.sessionStorage.getItem("userId"))
    const [userPalettesDisplayed, setUserPalettesDisplayed] = useState(true)


    const [displayedPalettes, setDisplayedPalettes] = useState(filterPalettes(palettes, UserId))
    const [userPalettes, setUserPalettes] = useState(filterPalettes(palettes, UserId))
    const [notUserPalettes, setNotUserPalettes] = useState(filterNotUserPalettes(palettes, UserId))
    const triggerAction = (index, action) => {
        setHasUpdated(prev => !prev)
    }




    useEffect(() => {
        let user = {
            id: window.sessionStorage.getItem("userId")
        }

        axios({
            url: `http://18.118.171.240/api/loggedInUser/${user.id}`,
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


        <div className={`${classes.root} h-[100vh]`}>
            <MainNavBar />
            <div className={classes.container}>
                <nav className={`${classes.nav} mt-[130px] mb-10`}>

                    <h1 className=' text-center mx-auto text-3xl font-bold '>Welcome, {user.firstName}</h1>
                
                   
                </nav>
                <div className='flex w-2/3 mx-auto justify-around text-blue bg-white rounded p-3 border-2 border-black'>
                    <div onClick={() => setUserPalettesDisplayed(true)} className={`cursor-pointer ${userPalettesDisplayed && "font-bold scale-105"}`}>
                        Your Palletes
                    </div>
                    <div onClick={() => setUserPalettesDisplayed(false)} className={`cursor-pointer ${!userPalettesDisplayed && "font-bold"}`}>
                        All Palettes
                    </div>

                </div>
                {displayedPalettes.length > 0 ?
                    <div className={`${classes.palettes} my-10 ${displayedPalettes.length > 6 && "overflow-y-scroll" }`}>
                    {displayedPalettes.map((palette, idx) =>
                        <MiniPalette {...palette} handleClick={goToPalette} userPalettesDisplayed={userPalettesDisplayed} triggerAction={triggerAction} idx={idx} key={palette.id} />)
                    }
                    </div>
:
                        <div className='text-white h-[90vh] my-10 flex items-start justify-center mx-auto w-full text-3xl'>
                            Please Create A Palette or Save an Existing!
                        </div>
                    
                    }

            </div>

        </div>
    )
}

export default withStyles(styles)(PaltteList)