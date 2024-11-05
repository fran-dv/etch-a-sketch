
const sketchGrid = document.querySelector('#sketch-grid');

let draw = true; // pencil mode by default

let gridLength = 16; // Default: 16

for (let row = 0; row < gridLength; row++) {
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    for (let col = 0; col < gridLength; col++) {
        const square = document.createElement('div');
        square.setAttribute('class', 'square');
        row.appendChild(square);
    }
    sketchGrid.appendChild(row);
}

const squares = document.querySelectorAll('.square');
const pencilMode = document.querySelector('#pencil-mode');
const eraserMode = document.querySelector('#eraser-mode');
const userMenu = document.querySelector('#user-menu');

pencilMode.addEventListener('click', () => {
    draw = true;
})

eraserMode.addEventListener('click', () => {
    draw = false;
    console.log(draw);
    const eraserMsg = document.createElement('p');
    eraserMsg.textContent = 'Click on a point to erase it!';
    userMenu.appendChild(eraserMsg);
})

squares.forEach((square) => {
    console.log(square);
    
    square.addEventListener('mouseenter', () => {
        if (draw) {
            square.style.backgroundColor = 'brown';
        }
    })

    square.addEventListener('click', () => {
        if (!draw) {
            square.style.backgroundColor = 'white';
        }
    })
})