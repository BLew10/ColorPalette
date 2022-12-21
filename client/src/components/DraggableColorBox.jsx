import React,{useState} from 'react'
import { withStyles} from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
import chroma from "chroma-js"


const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-7px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.2)"
        }
    },
    boxContent: {
        position: " absolute",
        width: " 100%",
        color: props => props.luminance > 0.15  ? "white" : "white",
        left: " 0px",
        bottom: " 0px",
        padding: " 10px",
        color: " black",
        letterSpacing: " 1px",
        textTransform: " uppercase",
        fontSize: " 12px",
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    
    }
}

const DraggableColorBox = SortableElement((props) => {
    const { color, classes, name, index, removeColor } = props

    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>

                <span className={chroma(color).luminance() > 0.15  ? "text-black" : "text-white"}>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={()=>removeColor()}/>
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox)