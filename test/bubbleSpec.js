define(['bubble', 'jquery'], function(bubbleFactory, $) {
  'use strict';

  describe('bubbleFactory', function() {

    var game, bounds, origin, Bubble, bubble;

    beforeEach(function() {

      origin = {
        x: 0,
        y: 0
      };

      game = {
        time: 0
      };

      bounds = {
        width: 1000,
        height: 1000
      };

      Bubble = bubbleFactory(game, bounds);
      bubble = new Bubble(origin);

    });

    it('can create a bubble', function() {

      expect(bubble).toBeDefined();

    });

    it('has sane parameters', function() {

      expect(bubble.origin).toEqual(origin);
      expect(bubble.birth).toEqual(game.time);

    });

    it('moves over time', function() {

      var x = bubble.x;
      var y = bubble.y;

      game.time += 1;

      expect(bubble.x).not.toEqual(x);
      expect(bubble.y).not.toEqual(y);

    });
  });
});
