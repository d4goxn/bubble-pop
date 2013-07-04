define(['time'], function (time) {
  'use strict';

  function LinearCtrl(scale, offset) {

    this.birth = time.now();
    this.scale = scale || 1;
    this.offset = offset || 0;

  }

  LinearCtrl.prototype = {
    get value() {
      var t = time.now() - this.birth;
      return this.scale * t + this.offset;
    }
  };

  return LinearCtrl;
});

