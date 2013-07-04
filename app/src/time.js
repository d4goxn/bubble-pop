define(function () {
  'use strict';

  var time = {
    now: function () {
      return Date.now() * 0.001;
    }
  };

  return time;
});
