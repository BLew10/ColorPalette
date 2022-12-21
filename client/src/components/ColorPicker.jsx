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
        <div className='flex flex-col justify-start items-center h-full w-[90%] [&>*]:my-3'>

            <Typography variant="h5" className='my-3' noWrap component="div">Design Your Palette</Typography>
            <div className='my-2'>
                <Button variant='contained' color="secondary" onClick={() => clearPalette()}>Clear Palette</Button>
                <Button variant='contained' color="primary" disabled={paletteIsFull} onClick={() => addRandomColor()}>Random Color</Button>
            </div>
            <ValidatorForm onSubmit={()=>generatePalette()} className={`flex flex-col w-full`}>
            <h1>Powered By Open AI</h1>
            <input type="text" placeholder="Desired AI Style ex:'modern', 'classic', 'futuristic'" className='w-full' onChange={(e)=>setStyle(e.target.value)} value={style}/>
            <div className='flex justify-between items-center'>
            <label>Number of Colors Generated: </label>
            <input type="number" className="w-1/3 text-right border-slate-200 border-2 my-2" onChange={(e)=>setnumberofColors(e.target.value)} value={numberofColors} max={20} min={1}/>
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
                    className={classes.colorNameInput}
                    margin="normal"
                />

                <Button classname={` h-[100px] ${classes.addColor}`} variant='contained' type="submit" color="primary" style={{ backgroundColor: paletteIsFull ? "grey" : newPaletteColor.hex }} disabled={paletteIsFull}> {!paletteIsFull ? "Add Color" : "Palette is Full"}</Button>
            </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(ColorPicker)