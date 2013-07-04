define(function () {
  'use strict';

  return {
    distance2: function(a, b) {
      var dx = a.x - b.x;
      var dy = a.y - b.y;
      return Math.pow(dx, 2) + Math.pow(dy, 2);
    }
  };
});
