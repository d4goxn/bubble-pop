define(['time'], function (time) {
  'use strict';

  function ParabolicCtrl(amplitude, frequency, offset, phase) {

    this.birth = time.now();
    this.amplitude = amplitude || 1;
    this.frequency = frequency || 1;
    this.offset = offset || 0;
    this.phase = phase || 0;
  }

  ParabolicCtrl.prototype = {
    get value() {
      var t = time.now() - this.birth;
      var value = Math.pow((t * this.frequency) % 2 - 1, 2);
      return this.amplitude * value + this.offset;
    }
  };

  return ParabolicCtrl;
});
