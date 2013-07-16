define(function () {
	'use strict';

	function Popout(bubble, image, lifetime, expire) {

		this.id = undefined;
		this._image = image;
		this.x = bubble.x;
		this.y = bubble.y;

		if(expire !== undefined) {
			setTimeout(expire, lifetime * 1000, this);
		}
	}

	Popout.prototype = {
		get image() {
			// TODO: animate opacity
			return this._image;
		},

		get left() { return this.x - this.image.width / 2; },
		get top() { return this.y - this.image.height / 2; }
	};

	return Popout;
});
