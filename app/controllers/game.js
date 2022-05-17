import Controller from '@ember/controller';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class GameController extends Controller {
  @action cellClick(index) {
    // Restart game if game is inactive
    if (!this.model.gameActive) {
      this.restart();
      return;
    }

    // Return if cell already contains x/o
    if (this.model.grid[index]) return;

    // Update grid to contain x/o
    this.fillCell(index, this.model.nowPlaying);

    // Check if current player won
    this.checkWin();

    // Check for draw if current player didn't win and game is still active
    if (this.model.gameActive) {
      this.checkDraw();
    }

    // Switch players if current player didn't win, current game didn't end in a draw and game is still active
    if (this.model.gameActive) {
      this.switchPlayer();
    }
  }

  @action restart() {
    this.model.nowPlaying = 'x';
    this.model.grid = A(['', '', '', '', '', '', '', '', '']);
    this.model.gameActive = true;
    this.model.gameWon = false;
    return;
  }

  @action fillCell(index, player) {
    this.model.grid[index] = player;
    this.model.grid = [...this.model.grid];
  }

  @action checkWin() {
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

    winConditions.some((winCondition) => {
      const cellA = this.model.grid[winCondition[0]];
      const cellB = this.model.grid[winCondition[1]];
      const cellC = this.model.grid[winCondition[2]];
      if (cellA === '' || cellB === '' || cellC === '') {
        return false;
      }
      if (cellA === cellB && cellB === cellC) {
        this.model.gameActive = false;
        this.model.gameWon = true;
        return true;
      }
    });
  }

  @action checkDraw() {
    if (!this.model.grid.includes('')) {
      this.model.nowPlaying = 'draw';
      this.model.gameActive = false;
      return;
    }
  }

  @action switchPlayer() {
    this.model.nowPlaying === 'x'
      ? (this.model.nowPlaying = 'o')
      : (this.model.nowPlaying = 'x');
  }
}
