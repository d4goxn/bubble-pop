define(['promise-simple', 'linearCtrl', 'sineCtrl'], function (Promise, LinearCtrl, SineCtrl) {
  'use strict';

  function Bubble(bounds, image) {

    this.image = image;

    this.motion = {
      vertical: new LinearCtrl(-5, bounds.height - 100),
      horizontal: new SineCtrl(bounds.width * 0.25, 0.25, bounds.width * 0.5)
    };
  }

  Bubble.prototype = {

    get x() { return this.motion.horizontal.value; },
    get y() { return this.motion.vertical.value; },
    get width() { return this.image.width; },
    get height() { return this.image.height; }
  };

  return Bubble;
});
