requirejs.config({
  paths: {
    'jquery': '../lib/jquery'
  }
});

define(['app', 'levels', 'bubble', 'jquery'], function (App, levels, bubbleFactory, $) {
  'use strict';

  var app = new App($('#display')[0]);
  var Bubble = bubbleFactory(app.game, app.renderer.bounds);

  levels.load('level1', function(level) {

    app.title = level.name;

    var origin = {
      x: 100,
      y: 100
    };

    var bubble = new Bubble(origin, 'images/' + level.associations[0].question.image);
    app.spawn(bubble);

    app.game.start();
  });

});
