import React, { useReducer, useEffect } from 'react'
import styles from '../styles/ColorBoxStyles'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'



const ColorBox = (props) => {
    const { paletteId, colorId, showFullPalette, name, classes } = props

    const color = props.background

    const reducer = (state, action) => {
        switch (action.type) {
            case 'copy':
                return { copied: true }
            case 'reset':
                return { copied: false }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, { copied: false })

    if (state.copied) {
        // Dispatch the reset action after 1500 milliseconds
        setTimeout(() => dispatch({ type: 'reset' }), 1500)
    }

    return (
        <CopyToClipboard text={color} onCopy={() => dispatch({ type: "copy" })}>
            <div style={{ background: color }} className={`${classes.ColorBox} `}>
                <div style={{ background: color }} className={`${classes.copyOverlay} ${state.copied && classes.showOverlay}`}>
                    <div className={`${classes.copyMessage} ${state.copied && classes.showCopyMessage}`}>
                        <h1> Copied! </h1>
                        <span className={classes.dynamicText}>{color}</span>
                    </div>
                </div>
                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.dynamicText}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>Copy</button>
                </div>
                {showFullPalette && <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                    <span className={`${classes.seeMore}`}>More</span>
                </Link>}

            </div>
        </CopyToClipboard>
    )
}

export default withStyles(styles)(ColorBox)

