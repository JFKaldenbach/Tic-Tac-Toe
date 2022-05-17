import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { service } from '@ember/service';

export default class GameRoute extends Route {
  @service store;
  model() {
    return this.store.createRecord('game', {
      grid: A(['', '', '', '', '', '', '', '', '']),
      nowPlaying: 'x',
      gameActive: true,
      gameWon: false,
    });
  }
}
