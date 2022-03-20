import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class GameGridComponent extends Component {
  @tracked nowPlaying = 'x';
  @tracked grid = new Array(9).fill('');
  @tracked status = `Current turn:`;
  @tracked gameActive = true;
  // @tracked grid = A([]);
  // @tracked grid = ['x']

  @action click() {
    const cell = event.target;
    const statusElement = document.getElementsByClassName('game--status');
    // Start new game if clicked when previous game had been completed
    if (!this.gameActive) {
      this.nowPlaying = 'x';
      this.grid = new Array(9).fill('');
      this.status = `Current turn:`;
      this.gameActive = true;
    }

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
    cell.classList.add(this.nowPlaying);
    this.grid[cell.dataset.cellId] = this.nowPlaying;
    console.log(this.grid);

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
        console.log(`${this.nowPlaying} won!`);
        this.status = `The winner is`;
        this.gameActive = false;
      }
    }

    // Check draw
    if (!this.gameActive) return;

    if (!this.grid.includes('')) {
      this.status = `It's a draw babes`;
      this.nowPlaying = 'draw';
      this.gameActive = false;
      return;
    }

    // Switch to next player
    this.nowPlaying === 'x' ? (this.nowPlaying = 'o') : (this.nowPlaying = 'x');
  }
}
