import Model, { attr } from '@ember-data/model';
export default class GameModel extends Model {
  @attr() grid; // TODO: Define attr type as Array?
  @attr('string') nowPlaying;
  @attr('boolean') gameActive;
  @attr('boolean') gameWon;

  get status() {
    if (this.gameWon) {
      return `The winner is...`;
    } else if (!this.gameActive) {
      return `It's a draw...`;
    } else {
      return `Current turn:`;
    }
  }
}
