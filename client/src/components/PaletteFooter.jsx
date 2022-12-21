import React from 'react'

const PaletteFooter = (props) => {
    const {palette} = props
  return (
    <footer className='h-[5vh] bg-white flex justify-end [&>*]:mx-4 my-3'>
    <span>{palette.paletteName}</span>
    <span>{palette.emoji}</span>
  </footer>
  )
}

export default PaletteFooter