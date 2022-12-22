import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
console.log(Picker)
const PaletteNamePopUp = (props) => {
  const { newPaletteName, handleChange, handleSubmit } = props
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("form");

  const handleClickOpen = () => {
    console.log("here")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showEmojiPicker = () => {
    setStage("emoji")
    // handleSubmit()
  }

  const savePalette = (emoji) => {
    handleSubmit(emoji.native)
  }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} className="bg-slate-300">
        Save
      </Button>

      <Dialog open={stage === "emoji"} onClose={()=> setStage("form")}>
      <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker onEmojiSelect={savePalette}/>
      </Dialog>
      <Dialog open={open && stage === "form"} onClose={handleClose} className="">
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please Name Your New Palette
            </DialogContentText>
             {/* <Picker /> */}
            <TextValidator
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              validators={['required', 'uniquePaletteName']}
              errorMessages={["Name your new Palette!", "This name has already been used"]}
              className="bg-white rounded w-full my-2 "
              placeholder='Palette Name'
              margin="normal"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button  type="submit"variant="contained" color="primary" >Save Palette</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  )
}

export default PaletteNamePopUp