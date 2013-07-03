requirejs.config({
  paths: {
    'jquery': '../lib/jquery'
  }
});

define(['app', 'jquery'], function (App, $) {
  'use strict';

  var app = new App($('#display')[0]);

});
