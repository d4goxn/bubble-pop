define([], function() {
  'use strict';

  function bubbleFactory(game, bounds) {

    function Bubble(origin, imageUrl) {

      this.birth = game.time;
      this.origin = origin; // starting position
      this.image = new Image();
      this.image.src = imageUrl;

    }

    Bubble.prototype = {

      radius: 100, // pixels
      climbRate: 5, // pixels per second
      swingRate: 0.25, // swings per second

      get x() {
        // Drift from side to side.

        var effectiveBounds = [
          this.radius,
          bounds.width - this.radius
        ]; // maximum horizontal distance

        var phaseOffset = (this.origin.x - effectiveBounds[0]) / effectiveBounds[1];
        var value = Math.sin(game.time * this.swingRate + phaseOffset) * 0.5 + 0.5; // 0 to 1, side to side
        var range = effectiveBounds[1] - effectiveBounds[0];
        var offset = effectiveBounds[0];

        return value * range + offset;
      },

      get y() {
        // Rise slowly.

        return (game.time - this.birth) * this.climbRate + this.origin.y;
      },

      get expired() {
        // Should this bubble be removed from the game?

        if(this.y >= this.radius) {
          // If we have drifted off the top of the screen:
          return true;
        }

        return false;
      }
    };

    return Bubble;
  }

  return bubbleFactory;
});
