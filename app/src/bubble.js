define([], function() {
  'use strict';

  function bubbleFactory (game) {

    function Bubble (origin) {

      this.birth = game.time;
      this.origin = origin;
    }

    Bubble.prototype = {

      radius: 100, // pixels
      climbRate: 5, // pixels per second
      swingRate: 0.25, // swings per second

      get x() {
        // Drift from side to side.

        var bounds = [
          this.radius,
          game.boundary.width - this.radius
        ]; // maximum horizontal distance

        var phaseOffset = (this.origin.x - bounds[0]) / bounds[1];
        var value = Math.sin(game.time * this.swingRate + phaseOffset) * 0.5 + 0.5; // 0 to 1, side to side
        var range = bounds[1] - bounds[0];
        var offset = bounds[0];

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
