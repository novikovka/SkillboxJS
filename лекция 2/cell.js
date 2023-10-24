export class Cell{
    constructor(gridElement, x, y){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridElement.appendChild(cell);
    }
}