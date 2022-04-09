import EmberRouter from '@ember/routing/router';
import config from 'tictactoe/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('how-to-play');
  this.route('game');
});
