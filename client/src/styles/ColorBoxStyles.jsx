 export default {
    ColorBox: {
        width: "20%",
        height: props => props.showFullPalette ? "25%" : "50%",
        margin: "auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-6px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        }

    },
    dynamicText: {
        color: props => props.luminance > 0.15  ? "black" : "white",
    },
    seeMore: {
        color: props => props.luminance > 0.15 ? "black" : "white",
        background:"  rgba(255, 2255, 255, 0.3)",
        position:" absolute",
        border:" none",
        right:" 0px",
        bottom:" 0px",
        width:" 60px",
        height:" 30px",
        textAlign:" center",
        lineBreak:" 30px",
        textTransform:" uppercase",
    },
    copyButton: {
        color: props => props.luminance > 0.5 ? "black" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        outline: "none",
        background: "rgba(255, 2255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        opacity: "0",

    },
    boxContent: {
    position:" absolute",
    width:" 100%",
    left:" 0px",
    bottom:" 0px",
    padding:" 10px",
    color:" black",
    letterSpacing:" 1px",
    textTransform:" uppercase",
    fontSize:" 12px",
    },
    copyOverlay: {
        opacity:" 0",
        zIndex:" 0",
        transition:" transform 0.6s ease-in-out",
        /* this make it really small so it gives it the allusion of starting from the center of each box  */
        transform:" scale(0.1)"
    },
    showOverlay: {
        opacity:" 1",
        transform:" scale(4)",
        zIndex:"10",
        position:" fixed",
        left:" 0",
        top:" 0",
        right:" 0",
        bottom:" 0",
        width:" 100vw",
        height:" 100vh",
    },
    copyMessage: {
        position:" fixed",
        left:" 0",
        top:" 0",
        right:" 0",
        bottom:" 0",
        display:" flex",
        justifyContent:" center",
        alignItems:" center",
        flexDirection:" column",
        fontSize:" 1rem",
        opacity:" 0",
        color:" white",
        transform:" scale(0.1)",
    },
    showCopyMessage: {
        opacity:" 1",
        transform:" scale(1)",
        zIndex:"25",
        transition:" all 0.4s ease-in-out",
        transitionDelay:" 0.1s",
        "& h1": {
            fontWeight:" 400",
            textAlign:" center",
            textShadow:" 1px 2px black",
            background:" rgba(255, 2255, 255, 0.3)",
            width:" 100%",
            marginBottom:" 0",
            padding:" 1rem",

        },
        "& span": {
            fontSize: "0.5rem"
        }
    }

}