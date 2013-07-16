define(['time'], function (time) {
	'use strict';

	function SineCtrl(amplitude, frequency, offset, phase) {

		this.birth = time.now();
		this.amplitude = amplitude || 1;
		this.frequency = frequency || 1;
		this.offset = offset || 0;
		this.phase = phase || 0;

	}

	SineCtrl.prototype = {
		get value() {

			var t = time.now() - this.birth;
			var phase = this.phase / this.frequency;
			var value = Math.sin((t + phase) * this.frequency); // -1 to 1

			return value * this.amplitude + this.offset;
		}
	};

	return SineCtrl;
});
