import React,  {useState, useEffect} from 'react'
import { withStyles } from '@material-ui/styles'
import styles from '../styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Add from '@material-ui/icons/Add';



const MiniPalette = (props) => {
  const { classes, PaletteName, emoji, colors, handleClick, id,  userPalettesDisplayed, triggerAction, PaletteId, PaletteUsers, idx} = props;
  const UserId = parseInt(window.sessionStorage.getItem("userId"))
  const [AssociationId, setAssociationId] = useState(undefined)
  useEffect(() => {
   
    if(userPalettesDisplayed && PaletteUsers.$values.length > 0) {
      console.log(PaletteUsers.$values.find(value => value.UserId === UserId).AssociationId)
      setAssociationId(PaletteUsers.$values.find(value => value.UserId === UserId).AssociationId)
    }
  }, [userPalettesDisplayed, PaletteUsers]);
 
  
  const miniColorBoxes = colors.map((color, index) => <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={index}></div>)

  const deletePalette = (associationId) => {
    axios.post(`http://localhost:5029/api/association/${associationId}/delete`)
    
    .then(res => triggerAction(idx, "delete"))
    .catch(err => console.log(err))

    

  }

  const createAssociationToPalette = (newAssociation) => {
    axios({
      url: "http://localhost:5029/api/association/create",
      method: "post",
      data: newAssociation,
      contentType: "application/json"
    })
    
    .then(res => triggerAction(idx, "add"))
    .catch(err => console.log(err))



  }


  return (
    <div className={classes.root} >
       {userPalettesDisplayed ? <DeleteIcon className={classes.actionIcon} onClick={() => deletePalette(AssociationId)}/> : <Add className={classes.actionIcon} onClick={() => createAssociationToPalette({PaletteId, UserId})}/>}
      <div className={classes.colors} onClick={() => handleClick(id)}>
        {miniColorBoxes}
      </div>
      <p className={classes.title}>{PaletteName} <span className={classes.emoji}>{emoji}</span></p>
    </div>

  )
}

export default withStyles(styles)(MiniPalette)