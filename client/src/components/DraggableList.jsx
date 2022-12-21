import React from 'react'
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';
import chroma from "chroma-js"

 const DraggableList = SortableContainer((props) => {
    const {colors, removeColor} = props
  return (
    <div style={{height:"100%"}}>
        {colors.map((color, index) => <DraggableColorBox color={color.color} name={color.name} index={index} removeColor={()=>removeColor(index)} colors={colors} luminance={chroma(color.color).luminance()}/>)}
    </div>
  )
})

export default DraggableList
