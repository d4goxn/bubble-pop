define(['geometry', 'linearCtrl', 'sineCtrl', 'parabolicCtrl'], function (geometry, LinearCtrl, SineCtrl, ParabolicCtrl) {
  'use strict';

  function Bubble(bounds, image, onPop) {

    this.id = undefined;
    this.image = image;
    this.onPop = onPop;

    this.motion = {
      horizontal: new SineCtrl(bounds.width * 0.25, 0.125, bounds.width * 0.5),

      vertical: (function(context) {
        // Watch the value of LinearCtrl. When it reaches a limit, fire an event.

        var linearCtrl = new LinearCtrl(-15, bounds.height);

        return {
          get value() {
            var value = linearCtrl.value;
            if(value <= 0) context.hitCeiling();
            return value;
          }
        };
      })(this)
    };
  }

  Bubble.prototype = {

    get x() { return this.motion.horizontal.value; },
    get y() { return this.motion.vertical.value; },

    get center() {
      return {
        x: this.x + this.width * 0.5,
        y: this.y + this.height * 0.5
      };
    },

    get width() { return this.image.width; },
    get height() { return this.image.height; },

    get radius() {
      var diameter = Math.max(this.image.width, this.image.height);
      return diameter * 0.5;
    },

    intersectsPoint: function(point) {

      var distance2 = geometry.distance2(point, this.center);
      var radius2 = Math.pow(this.radius, 2);
      return distance2 <= radius2;
    },

    click: function() {
      this.onPop(this);
    },

    hitCeiling: function() {
      // Slow down and bounce around at the top of the screen.

      var speed = 25;
      this.motion.vertical = new ParabolicCtrl(-speed, 0.25, speed);

      /* BUG: discontinuity
      var freqMultiplier = 0.25;
      var phase = this.motion.horizontal.value / this.motion.horizontal.amplitude;

      this.motion.horizontal.frequency *= freqMultiplier;
      this.motion.horizontal.phase = phase;
      */
    }
  };

  return Bubble;
});
