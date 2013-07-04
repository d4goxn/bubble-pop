define([], function () {
  'use strict';

  function Popout(position, image) {
    this.image = image;
    this.x = position.x;
    this.y = position.y;
  }

  Popout.prototype = {
  };

  return Popout;
});
