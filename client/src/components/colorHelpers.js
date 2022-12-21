import chroma from "chroma-js"


const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const genereatePalette = (starterPallete) => {
    console.log(starterPallete)
    let newPalette = {
        PaletteName: starterPallete.PaletteName,
        id: starterPallete.id,
        emoji: starterPallete.emoji,
        colors: {}
    }

    for(let level of levels){
        newPalette.colors[level] = []
    }

    //each color is going to generate a scale,
    //looping through all colors in the palette. Each color pushes its level to the level in the newPallete
    //ex: loops through the first color, say its pink. Pushes pink 50 onto the 50 array, then pink 100 onto the 100 array, etc. 
    //does that for every color
    for(let color of starterPallete.colors){
        let scale = generateScale(color.color, 10).reverse()
        for(let i in scale){
            //i is an index
            //levels is from line 30
            //pushing a new light version of the color into an arrow
            newPalette.colors[levels[i]].push({
                name:`${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb","rgba").replace(")", ",1.0)"),
                luminance: chroma(scale[i]).luminance()
            })
        }

    }
    return newPalette
}

const getRange = (hexColor) => {
    const end = "#fff";
    return [
        chroma(hexColor).darken(1.4).hex(), hexColor, end
    ]
}

const generateScale = (hexColor, numberOfColors) => {
    //returns a array of colors that are within the range set by getRange and in the space of whatever mode says
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);

}


export {genereatePalette}
// The chroma.scale() method from the chroma-js library creates a color scale based on a given array of colors. It returns a function that can be used to generate colors from the scale at specific positions.

// For example, if you have an array of three colors ['red', 'green', 'blue'], calling chroma.scale(['red', 'green', 'blue']) would create a color scale with red at the start, green in the middle, and blue at the end. You could then use the returned function to generate a color at any position along the scale. For example, chroma.scale(['red', 'green', 'blue'])(0.25) would return a color that is 25% of the way between red and green.

// The chroma.mode() method is used to set the color mode for a color scale. The color mode determines how colors are interpolated within the scale. For example, the default color mode is "rgb", which interpolates colors in the red-green-blue color space. The "lab" color mode interpolates colors in the CIE Lab color space, which can produce more perceptually uniform color scales.