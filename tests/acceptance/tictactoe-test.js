import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | tictactoe', function (hooks) {
  setupApplicationTest(hooks);

  test('The user can access other pages from the homepage', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/', "it doesn't redirect");
    assert.dom('[data-test-button-start]').exists('it renders a start button');
    await click('[data-test-button-start]');
    assert.strictEqual(currentURL(), '/game', 'the button links to /game');
  });

  test('The user can access instructions', async function (assert) {
    await visit('/how-to-play');
    assert.strictEqual(currentURL(), '/how-to-play', "it doesn't redirect");
    assert.dom('ol li').exists('it renders instructions');
    assert.dom('[data-test-button]').exists('it renders a start button');
    await click('[data-test-button]');
    assert.strictEqual(currentURL(), '/game', 'the button links to /game');
    await visit('/how-to-play');
    await click('[data-test-menu-center] a');
    assert.strictEqual(currentURL(), '/', 'the logo links to homepage');
  });

  test('The user can play a game', async function (assert) {
    await visit('/game');
    await click('[data-test-cell-id="0"]');
    assert
      .dom('[data-test-cell-status="x"]')
      .exists('x renders in top left cell');
    assert
      .dom('[data-test-cell-id="0"]')
      .hasClass('x', 'top left cell gets correct class after click: "x"');

    await visit('/game');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="8"]');
    await click('[data-test-cell-id="6"]');
    assert
      .dom('[data-test-game--status]')
      .containsText('draw', 'draw functions correctly');
    assert
      .dom('[data-test-game--status]')
      .exists('board becomes inactive after completed game');
    await click('[data-test-cell-id="6"]');
    assert
      .dom('[data-test-game--status]')
      .containsText(
        'Current',
        'board resets after clicking on cell in inactive board'
      );

    await visit('/game');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="7"]');
    assert
      .dom('[data-test-game--status="x"]')
      .containsText('winner', 'winner is displayed correctly');
    assert
      .dom('[data-test-game--grid-active="inactive"]')
      .exists('board becomes inactive after game');
  });
});
