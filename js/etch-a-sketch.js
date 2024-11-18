const sketchGrid = document.querySelector('#sketch-grid');
const userMenu = document.querySelector('#user-menu');
const pencilMode = document.querySelector('#pencil-mode');
const eraserMode = document.querySelector('#eraser-mode');
const swatchGrid = document.querySelector('#swatch-grid');
const resizeButtons = document.querySelectorAll('#grid-size .resize');
const screenshotButton = document.querySelector('.img-button.screenshot');

let pencil = true; // pencil mode by default

let gridLength = 16; // Default: 16

let squares;

const defaultTitleColor = '#000';
const title = document.querySelector('.title');

const titleText = 'ETCH A SKETCH';

const randomColors = randomColor({
    count: 10, 
    luminosity: 'dark',
});

// generate each character of title within spans
const titleArray = titleText.split('');
title.innerHTML = '';
for (let i = 0; i < titleArray.length; i++) {
    if (titleArray[i] === ' ') {
        title.innerHTML += ' ';
    } else {
        title.innerHTML += `<span>${titleArray[i]}</span>`
    }
}

// generate random number in a range, excluding the numbers in an array passed by parameter if it is wanted
function randomInt (range, undesiredNumbers = []) {
    let number = Math.floor(Math.random() * range); // generate random integer

    while (undesiredNumbers.includes(number)) {
        number = Math.floor(Math.random() * range);
    }
    return number;
}

let randomIndex = null;
const currentPaintedIndexes = [];

const titleChars = document.querySelectorAll('.title span');

title.addEventListener('mouseenter', () => {
    // reset previous painted char to default title text
    if (currentPaintedIndexes.length >  0) {
        currentPaintedIndexes.forEach((index) => {
            titleChars[index].textContent = titleChars[index].textContent.toUpperCase();
            titleChars[index].style.color = defaultTitleColor;
        })
        currentPaintedIndexes.length = 0;
    }
    
    for (i = 0; i < 3; i++) {
        randomIndex = randomInt(titleChars.length, currentPaintedIndexes);
        currentPaintedIndexes.push(randomIndex);
        titleChars[randomIndex].textContent = titleChars[randomIndex].textContent.toLowerCase();
        titleChars[randomIndex].style.color = randomColors[randomInt(10)];
    }
})

const defaultSquareColor = 'rgb(255, 255, 255)';

function createGrid(gridLength) {
    for (let row = 0; row < gridLength; row++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        for (let col = 0; col < gridLength; col++) {
            const square = document.createElement('div');
            square.setAttribute('class', 'square');
            square.style.backgroundColor = 'rgb(255, 255, 255)';
            row.appendChild(square);
        }
        sketchGrid.appendChild(row);
    }
    squares = document.querySelectorAll('.square');
    updateSquares();
}

function deleteCurrentGrid() {
    while (sketchGrid.firstChild) {
        sketchGrid.removeChild(sketchGrid.firstChild);
    }
}

createGrid(gridLength); // create the default grid

resizeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        switch (button.getAttribute('class')) {
            case 'img-button resize small':
                gridLength = 16;    
                break;
            case 'img-button resize medium':
                gridLength = 30;    
                break;
            case 'img-button resize big':
                gridLength = 50;    
                break;
        }
        pencil = true;
        deleteCurrentGrid();
        createGrid(gridLength);
    })
})


pencilMode.addEventListener('click', () => {
    pencil = true;
})

eraserMode.addEventListener('click', () => {
    pencil = false;
})

const hoverSquareColor = 'rgb(241, 240, 239)';

function updateSquares () {
    let drawing = false;
    squares.forEach((square) => {

        square.addEventListener('mouseenter', () => {
            if (!drawing && square.style.backgroundColor === defaultSquareColor) {
                square.style.backgroundColor = hoverSquareColor;
            }
        })

        square.addEventListener('mouseleave', () => {
            if (!drawing && square.style.backgroundColor === hoverSquareColor) {
                square.style.backgroundColor = defaultSquareColor;
            }
        })

        square.addEventListener('mousedown', () => {
            drawing = true;
            if (pencil) {
                square.style.backgroundColor = colorPicker.color.rgbString;
            } else {
                square.style.backgroundColor = defaultSquareColor;
            }
        })

        square.addEventListener('mousemove', () => {
            if (pencil && drawing) { // Pencil mode
                square.style.backgroundColor = colorPicker.color.rgbString;
            } else if (!pencil && drawing) { // Eraser mode
                square.style.backgroundColor = defaultSquareColor;
            }
        })

        square.addEventListener('mouseup', () => {
            drawing = false;
        })
    })
}

const colorPicker = new iro.ColorPicker("#wheel", {
    width: 190,
    color: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    layout: [
        { 
          component: iro.ui.Wheel
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'value',
          }
        },
      ]
});

const [black, white, red, blue, yellow, green, orange, purple, gray, pink, cyan, brown] = 
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(255, 165, 0)", "rgb(128, 0, 128)", "rgb(128, 128, 128)", "rgb(255, 192, 203)", "rgb(0, 255, 255)", "rgb(165, 42, 42)"];

colors = [black, white, red, blue, yellow, green, orange, purple, gray, pink, cyan, brown];

let selectedSwatch = null;
const defaultBorderAttribute = '2px solid #000';
const selectedBorderAttribute = '4px solid #D0B8A8';

colors.forEach((color) => {
    const swatch = document.createElement('div');
    swatch.setAttribute('class', `swatch color${colors.indexOf(color)}`);
    swatch.style.backgroundColor = color;
    swatchGrid.appendChild(swatch);

    // hover and selected effect
    swatch.addEventListener('mouseenter', () => {
        if (swatch !== selectedSwatch) {
            swatch.style.borderColor = '#A6AEBF';
        }
    })

    swatch.addEventListener('mouseleave', () => {
        if (swatch !== selectedSwatch) {
            swatch.style.border = defaultBorderAttribute;
        }
    })

    swatch.addEventListener('click', () => {
        colorPicker.color.rgbString = color;
        // change the highlighted swatch to the current selected
        if (!selectedSwatch) {
            selectedSwatch = swatch;
        } else {
            selectedSwatch.style.border = defaultBorderAttribute;
        }
        pencil = true;
        selectedSwatch = swatch;
        selectedSwatch.style.border = selectedBorderAttribute;
    })
})

colorPicker.on("color:change", () => {
    if (selectedSwatch) {
        if (colorPicker.color.rgbString !== selectedSwatch.style.backgroundColor) {
            selectedSwatch.style.border = defaultBorderAttribute;
            selectedSwatch = null;
        }
    } else if (!selectedSwatch && colors.includes(colorPicker.color.rgbString)) { // color picked from wheel is equal to any swatch
        selectedSwatch = document.querySelector(`.swatch.color${colors.indexOf(colorPicker.color.rgbString)}`);
        selectedSwatch.style.border = selectedBorderAttribute;
    }
});


screenshotButton.addEventListener('click', () => {
    html2canvas(sketchGrid, {scale : 2}).then(function(canvas) {
        console.log(canvas);
        Canvas2Image.saveAsPNG(canvas, 720, 720, 'your_draw');
    });
    
    
});