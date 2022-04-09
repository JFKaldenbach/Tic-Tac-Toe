import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a footer', async function (assert) {
    // Render without content
    await render(hbs`<Footer />`);

    assert
      .dom('[data-test-footer]')
      .hasText('', "footer doesn't display any text by default");

    // Render with content
    await render(hbs`
      <Footer>
        template block text
      </Footer>
    `);

    assert
      .dom('[data-test-footer]')
      .hasText('template block text', 'footer displays yield');
  });
});
