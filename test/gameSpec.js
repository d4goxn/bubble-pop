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

  });
});
