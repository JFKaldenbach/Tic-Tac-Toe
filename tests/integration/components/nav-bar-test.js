import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nav-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a nav-bar', async function (assert) {
    await render(hbs`<NavBar />`);
    assert.dom('h1').exists('it renders an h1');
    assert.dom('h1').hasText('TicTacToe', 'it renders the correct "logo"');
    assert
      .dom('[data-test-menu-right]')
      .hasText('help_outline', 'it renders the help icon in menu');
  });
});
