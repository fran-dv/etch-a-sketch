
const sketchGrid = document.querySelector('#sketch-grid');

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