import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | how-to-play', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:how-to-play');
    assert.ok(route);
  });
});
