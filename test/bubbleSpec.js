define(['bubble', 'jquery'], function(bubbleFactory, $) {
  'use strict';

  describe('bubbleFactory', function() {

    var game, origin, Bubble;

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
        time: Math.PI
      };

      Bubble = new bubbleFactory(game);
    });

    it('can create a bubble', function() {

      var bubble = new Bubble(origin);

      expect(bubble).toBeDefined();
    });

    it('has sane parameters', function() {

      var bubble = new Bubble(origin);

      expect(bubble.origin).toEqual(origin);
      expect(bubble.birth).toEqual(game.time);
    });

    it('moves over time', function() {
      
      var bubble = new Bubble(origin);
      var x = bubble.x;
      var y = bubble.y;

      game.time += 1;

      expect(bubble.x).not.toEqual(x);
      expect(bubble.y).not.toEqual(y);
    })
  });
});
