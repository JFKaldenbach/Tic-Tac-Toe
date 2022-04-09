import Route from '@ember/routing/route';
import GameModel from '../models/game';

export default class GameRoute extends Route {
  model() {
    return new GameModel();
  }
}
