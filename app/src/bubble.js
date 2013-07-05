define(['geometry', 'linearCtrl', 'sineCtrl', 'parabolicCtrl'], function (geometry, LinearCtrl, SineCtrl, ParabolicCtrl) {
  'use strict';

  function Bubble(bounds, image, onPop) {

    this.id = undefined;
    this.image = image;
    this.onPop = onPop;

    this.motion = {
      vertical: new LinearCtrl(-5, bounds.height - 100),
      horizontal: new SineCtrl(bounds.width * 0.25, 0.125, bounds.width * 0.5)
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
      this.motion.vertical = new ParabolicCtrl(-10, 0.25, 10);
    }
  };

  return Bubble;
});
