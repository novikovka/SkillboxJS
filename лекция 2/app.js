import { Grid } from "./grid.js";

const gameBoard = document.querySelector('.game-board');

const grid = new Grid(gameBoard);

const element = document.createElement('div');
element.classList.add('element');
element.style.width = '100px';
element.style.height = '100px';
element.style.background = 'red';
gameBoard.appendChild(element);
