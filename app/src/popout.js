define(function () {
  'use strict';

  function Popout(center, image, lifetime, expire) {

    this.id = undefined;
    this._image = image;
    this.x = center.x - image.width * 0.5;
    this.y = center.y - image.height * 0.5;

    if(expire !== undefined) {
      setTimeout(expire, lifetime * 1000, this);
    }
  }

  Popout.prototype = {
    get image() {
      // TODO: animate opacity
      return this._image;
    }
  };

  return Popout;
});
