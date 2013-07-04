define(['time'], function (time) {
  'use strict';

  function SineCtrl(range, scale, offset) {

    this.birth = time.now();
    this.range = range;
    this.scale = scale;
    this.offset = offset;

  }

  SineCtrl.prototype = {
    get value() {
      var t = time.now() - this.birth;
      return this.range * Math.sin(t * this.scale) + this.offset;
    }
  };

  return SineCtrl;
});
