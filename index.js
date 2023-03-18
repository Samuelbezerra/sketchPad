let currentColor = "#333333"
let currentMode = "color"
var currentSquares = 16

const squareCounter = document.getElementById("square-counter");
const container = document.getElementById("container")
const square = document.getElementsByClassName("square")
const colorSelector = document.getElementById("color-selector")
const colorButton = document.getElementById("0")
const rainbowButton = document.getElementById("1")
const eraserButton = document.getElementById("2")
const clearButton = document.getElementById("3")
const squareSelector = document.getElementById("square-count")

function reloadSquares () {
    const squareSize = 400/currentSquares; 
    container.innerHTML = ""

    for(var i = 0; i<currentSquares**2; i++) {
        var squareDiv = document.createElement("div")
        squareDiv.classList.add("square")
        squareDiv.style.width= squareSize +"px"
        squareDiv.style.height= squareSize +"px"
        squareDiv.addEventListener("mouseover", changeColor)
        squareDiv.addEventListener("mousedown", changeColor)

        container.appendChild(squareDiv);
    }   
}

colorSelector.oninput = (e)=> currentColor = e.target.value;
colorButton.onclick = () => {
    currentMode = "color"
    colorButton.classList.add("active")
    rainbowButton.classList.remove("active")
    eraserButton.classList.remove("active")
}
rainbowButton.onclick = () => {
    currentMode = "rainbow"
    colorButton.classList.remove("active")
    rainbowButton.classList.add("active")
    eraserButton.classList.remove("active")
}
eraserButton.onclick = () => {
    currentMode = "eraser"
    colorButton.classList.remove("active")
    rainbowButton.classList.remove("active")
    eraserButton.classList.add("active")
}
clearButton.onclick = () => reloadSquares()


let mouseDown = false
document.body.onmousedown = () => mouseDown = true
document.body.onmouseup = () => mouseDown = false

for(var i = 0; i<16**2; i++) {
    var squareDiv = document.createElement("div")
    squareDiv.classList.add("square")
    squareDiv.addEventListener("mouseover", changeColor)
    squareDiv.addEventListener("mousedown", changeColor)

    container.appendChild(squareDiv)
}

squareSelector.onchange = (e) => {
    currentSquares = e.target.value
    const squareSize = 400/currentSquares; 
    squareCounter.innerHTML = `${currentSquares} x ${currentSquares}`
    container.innerHTML = ""

    for(var i = 0; i<currentSquares**2; i++) {
        var squareDiv = document.createElement("div")
        squareDiv.classList.add("square")
        squareDiv.style.width= squareSize +"px"
        squareDiv.style.height= squareSize +"px"
        squareDiv.addEventListener("mouseover", changeColor)
        squareDiv.addEventListener("mousedown", changeColor)

        container.appendChild(squareDiv);
    }    
}

function toggleButton (index) {
    for(var i = 0;i<4;i++) {
        document.getElementById(`${i}`).classList.remove("active");
    }
    const button = document.getElementById(`${index}`)
    button.classList.add("active")
}

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "white"
    }
}