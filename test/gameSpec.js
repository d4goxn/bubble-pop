define(['game'], function(Game) {
  'use strict';

  describe('game', function() {

    var game;

    beforeEach(function() {

      game = new Game();

    });

    it('can spawn an object', function() {

      var obj = {};
      var id = game.spawn(obj);

      expect(game.objects[id]).toBeDefined();
    });

    it('deletes expired objects', function() {

      var obj = {expired: false};
      var id = game.spawn(obj);

      expect(game.objects[id]).toBeDefined();

      obj.expired = true;
      game.removeExpiredObjects();

      expect(game.objects[id]).not.toBeDefined();
    });
  });
});
