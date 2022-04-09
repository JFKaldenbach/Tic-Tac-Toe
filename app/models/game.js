import Model from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { v4 as uuidv4 } from 'uuid';
import { service } from '@ember/service';

export default class GameModel extends Model {
  @service store;
  @service games;
  @tracked grid = A(['', '', '', '', '', '', '', '', '']);
  @tracked nowPlaying = 'x';
  @tracked status = `Current turn:`;
  @tracked gameActive = true;

  @action gridClick() {
    // Restart game if gameActive is false
    if (!this.gameActive) {
      this.restart();
      return;
    }

    const cell = event.target.closest('.cell');

    // Return if clicked element isn't a cell
    if (!cell) return;

    const cellId = cell.dataset.cellId;

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
    this.grid = [...this.grid];

    console.log(this.grid, this.nowPlaying, this.status, this.gameActive);
    // this.games.add('hey');
    // this.store.createRecord('savedGame', {
    //   grid: A(['test']),
    // });

    // Check win
    winConditions.some((winCondition) => {
      const cellA = this.grid[winCondition[0]];
      const cellB = this.grid[winCondition[1]];
      const cellC = this.grid[winCondition[2]];
      if (cellA === '' || cellB === '' || cellC === '') {
        return false;
      }
      if (cellA === cellB && cellB === cellC) {
        this.status = `The winner is`;
        this.gameActive = false;
        return true;
      }
    });

    // Check draw
    if (!this.gameActive) return;
    if (!this.grid.includes('')) {
      this.status = `It's a draw...`;
      this.nowPlaying = 'draw';
      this.gameActive = false;
      return;
    }

    // Switch to next player if no win or draw
    if (!this.gameActive) return;
    this.nowPlaying === 'x' ? (this.nowPlaying = 'o') : (this.nowPlaying = 'x');
  }

  @action restart() {
    this.nowPlaying = 'x';
    this.grid = A(['', '', '', '', '', '', '', '', '']);
    this.status = `Current turn:`;
    this.gameActive = true;
    return;
  }
}
