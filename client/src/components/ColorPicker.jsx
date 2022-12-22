import React, { useState, useEffect } from 'react'

import Typography from '@mui/material/Typography';

import { ChromePicker } from "react-color"
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { withStyles } from '@material-ui/styles'

const styles = {
    picker: {
        width: "100% !important",
        marginTop: "2rem"
    },
    addColor: {
        width: "100% ",
        padding: "3rem",
        fontSize: "2rem",
        marginTop: "1rem"
    },
    colorNameInput: {
        width: "100%",
        height: "70px"
    }
}

const ColorPicker = (props) => {

    const { handleColorChange, addRandomColor, addColor, newColorName, handleChange, paletteIsFull, newPaletteColor, clearPalette, classes, aiGeneratedPalette} = props
    const [style, setStyle] = useState("")
    const [numberofColors, setnumberofColors] = useState(1)

    const generatePalette = ()=> {
        aiGeneratedPalette(style, numberofColors)
    }
    return (
        <div className='flex flex-col justify-start items-center text-white h-full bg-black w-[90%] [&>*]:my-3'>

            <Typography variant="h4" className='my-3 ' noWrap component="div">Design Your Palette</Typography>
            <div className='my-5'>
            {!paletteIsFull && <Button variant='contained' color="primary"  onClick={() => addRandomColor()}> Random Color</Button>}
                <Button variant='contained' color="secondary" onClick={() => clearPalette()}>Clear Palette</Button>
               
            </div>
            <ValidatorForm onSubmit={()=>generatePalette()} className={`flex flex-col w-full`}>
            <h1 className='w-fit mx-auto font-bold'>Powered By Open AI:</h1>
            <input type="text" placeholder="Desired Palette Style " className='w-full rounded px-3 py-2 my-3 text-black' onChange={(e)=>setStyle(e.target.value)} value={style}/>
            <div className='flex justify-between items-center'>
            <label className='font-bold'>Number of Colors Generated: </label>
            <input type="number" className="w-1/3 text-right border-slate-200 border-2 my-2 rounded px-3 py-2 text-black" onChange={(e)=>setnumberofColors(e.target.value)} value={numberofColors} max={20} min={1}/>
            </div>
                <Button classname={` h-[100px] ${classes.addColor}`} variant='contained' type="submit" color="primary" style={{ backgroundColor: "blue" }} >Generate AI Palette</Button>
            </ValidatorForm>
            <ChromePicker color={newPaletteColor} onChange={(newColor) => handleColorChange(newColor)} className={classes.picker} />
            <ValidatorForm onSubmit={() => addColor(newPaletteColor)} className={`flex flex-col`}>
                <TextValidator
                    value={newColorName}
                    variant="filled"
                    name="newColorName"
                    onChange={handleChange}
                    validators={['required', 'uniqueColorName', 'uniqueColor']}
                    errorMessages={["Name your new Color!", "This name has already been used", "This color has already been added!"]}
                    className={`${classes.colorNameInput} bg-white rounded text-black`}
                    margin="normal"
                />

                <Button classname={` h-[100px] ${classes.addColor}`} variant='contained' type="submit" color="primary" style={{ backgroundColor: paletteIsFull ? "grey" : newPaletteColor.hex }} disabled={paletteIsFull}> {!paletteIsFull ? "Add Color" : "Palette is Full"}</Button>
            </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(ColorPicker)