import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
export default class GameGridComponent extends Component {
  @tracked nowPlaying = 'x';
  @tracked status = `Current turn:`;
  @tracked gameActive = true;
  @tracked grid = A(['', '', '', '', '', '', '', '', '']);
  @tracked restartable = !this.grid.every((e) => e === '');

  @action click() {
    const cell = event.target;
    const cellId = cell.dataset.cellId;

    // Start new game if clicked when previous game had been completed
    if (!this.gameActive) {
      this.nowPlaying = 'x';
      this.grid = A(['', '', '', '', '', '', '', '', '']);
      this.status = `Current turn:`;
      this.gameActive = true;
      return;
    }

    // Return if clicked element isn't a cell
    if (!cell.classList.contains('cell')) return;

    // Return if cell already contains x/o
    if (this.grid[cellId]) return;

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

    // Update grid to contain x/o
    this.grid[cell.dataset.cellId] = this.nowPlaying;
    this.grid = this.grid;

    // Check win
    winConditions.some((winCondition) => {
      const cellA = this.grid[winCondition[0]];
      const cellB = this.grid[winCondition[1]];
      const cellC = this.grid[winCondition[2]];
      if (cellA === '' || cellB === '' || cellC === '') {
        return false;
      }
      if (cellA === cellB && cellB === cellC) {
        this.status = `Congratulations! The winner is`;
        this.gameActive = !this.gameActive;
        return true;
      }
    });

    // Check draw
    if (!this.grid.includes('')) {
      this.status = `It's a draw...`;
      this.nowPlaying = 'draw';
      this.gameActive = !this.gameActive;
      return;
    }

    // Switch to next player if no win or draw
    if (!this.gameActive) return;
    this.nowPlaying === 'x' ? (this.nowPlaying = 'o') : (this.nowPlaying = 'x');
  }
}
