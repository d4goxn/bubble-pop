define(['time'], function (time) {
  'use strict';

  function SineCtrl(amplitude, frequency, offset, phase) {

    this.birth = time.now();
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.offset = offset;
    this.phase = phase;

  }

  SineCtrl.prototype = {
    get value() {
      var t = time.now() - this.birth;
      var value = Math.sin(t * this.frequency + this.phase); // -1 to 1
      return value * this.amplitude + this.offset;
    }
  };

  return SineCtrl;
});
