define(['game', 'canvasRenderer'], function(Game, Renderer) {
  'use strict';

  var App = function(canvas) {

    this.game = new Game();
    this.renderer = new Renderer(canvas);

  };

  return App;

});
