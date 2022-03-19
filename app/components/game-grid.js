import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class GameGridComponent extends Component {
  @tracked currentPlayer = 'x';
  @tracked grid = new Array(9).fill('');

  @action click() {
    const cell = event.target;
    // Return if clicked element isn't a cell
    if (!cell.classList.contains('cell')) return;

    // Return if cell isn't empty
    if (['x', 'o'].some((el) => cell.classList.contains(el))) return;

    // Grid array win conditions
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];

    // Display x/o in clicked cell
    cell.classList.add(this.currentPlayer);
    this.grid[cell.dataset.cellId] = this.currentPlayer;

    // Check win
    for (let i = 0; i < winConditions.length; i++) {
      const winCondition = winConditions[i];
      let cellA = this.grid[winCondition[0]];
      let cellB = this.grid[winCondition[1]];
      let cellC = this.grid[winCondition[2]];
      if (cellA === '' || cellB === '' || cellC === '') {
        continue;
      }
      if (cellA === cellB && cellB === cellC) {
        console.log(`${this.currentPlayer} won!`);
      }
    }

    // Check draw
    // if (!this.grid.includes('')) console.log('Its a draw babes');

    // Switch to next player
    this.currentPlayer === 'x'
      ? (this.currentPlayer = 'o')
      : (this.currentPlayer = 'x');
  }
}
