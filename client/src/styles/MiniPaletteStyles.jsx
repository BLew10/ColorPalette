export default {
    root: {
        backgroundColor:"white",
        borderRadius:"5px",
        border: "1px solid black",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
            cursor: "pointer"
        },
        flexBasis:"30%",
        margin:"3px 3px",
        // "&:hover svg": {
        //     color: "red",
        //     transform: "scale(1.2)"
        // }
    },
    colors: {
        backgroundColor:"#dae1e4",
        height:"150px",
        width: "100%"
   
    },
    title: {
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        paddingTop: "1rem",
        position:"relative",
        fontWeight: "700"
    },
    emoji:{
        marginLeft: "0.5rem",
        fontSize: "1.5rem"

    },
    miniColor: {
        width: "20%",
        height: "25%",
        display:"inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-6px"

    },
    actionIcon: {
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            color: props => props.userPalettesDisplayed  ? "red" : "green",
            transform: "scale(1.2)"
        }
    }
}