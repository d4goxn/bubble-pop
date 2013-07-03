define(['bubble', 'jquery'], function(bubbleFactory, $) {
  'use strict';

  describe('bubbleFactory', function() {

    var game, origin, Bubble, bubble;

    beforeEach(function() {

      origin = {
        x: 0,
        y: 0
      };

      game = {
        boundary: {
          width: 1000,
          height: 1000
        },
        time: 0
      };

      Bubble = new bubbleFactory(game);
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
