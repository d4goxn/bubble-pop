define(['time'], function (time) {
  'use strict';

  function LinearCtrl(scale, offset) {

    this.birth = time.now();
    this.offset = offset;
    this.scale = scale;

  }

  LinearCtrl.prototype = {
    get value() {
      var t = time.now() - this.birth;
      return this.scale * t + this.offset;
    }
  };

  return LinearCtrl;
});

