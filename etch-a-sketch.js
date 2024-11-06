
const sketchGrid = document.querySelector('#sketch-grid');

let draw = true; // pencil mode by default

let gridLength = 16; // Default: 16

for (let row = 0; row < gridLength; row++) {
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    for (let col = 0; col < gridLength; col++) {
        const square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.style.backgroundColor = '#fff';
        row.appendChild(square);
    }
    sketchGrid.appendChild(row);
}

const squares = document.querySelectorAll('.square');
const pencilMode = document.querySelector('#pencil-mode');
const eraserMode = document.querySelector('#eraser-mode');
const userMenu = document.querySelector('#user-menu');
const sketch = document.querySelector('#sketch');

pencilMode.addEventListener('click', () => {
    draw = true;
})

eraserMode.addEventListener('click', () => {
    draw = false;
})

squares.forEach((square) => {
    
    square.addEventListener('mouseenter', () => {
        if (draw) {
            if (square.style.backgroundColor === 'rgb(255, 255, 255)') {
                square.style.backgroundColor = colorPicker.color.hexString;
            }
        }
    })

    square.addEventListener('mouseenter', () => {
        if (!draw) {
            square.style.backgroundColor = '#fff';
        }
    })
})


const colorPicker = new iro.ColorPicker("#wheel", {
    width: 250,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#0d0d0d",
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

const swatchGrid = document.querySelector('#swatch-grid');

const [black, white, red, blue, yellow, green, orange, purple, gray, pink, cyan, brown] = 
    ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#FFFF00", "#00FF00", "#FFA500", "#800080", "#808080", "#FFC0CB", "#00FFFF", "#A52A2A"];

colors = [black, white, red, blue, yellow, green, orange, purple, gray, pink, cyan, brown];

colors.forEach((color) => {
    const swatch = document.createElement('div');
    swatch.setAttribute('class', 'swatch');
    swatch.style.backgroundColor = color;
    swatchGrid.appendChild(swatch);
    console.log(color);
})


