import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a button with the specified parameters', async function (assert) {
    await render(
      hbs`<Button @route='game' @aria-label="Play now" class='back'>Play now</Button>`
    );

    assert
      .dom('[data-test-button]')
      .exists('it renders')
      .hasAttribute('href', '/game', 'it links correctly');

    assert
      .dom('[data-test-button] button')
      .exists('it renders a button')
      .hasAttribute('aria-label', 'Play now', 'it gets correct aria-label')
      .hasClass('back', 'it gets correct class')
      .hasText('Play now', 'it displays the correct label');
  });
});
