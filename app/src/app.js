define(['game', 'canvasRenderer', 'jquery'], function(Game, Renderer, $) {
  'use strict';

  var App = function(canvas) {

    this.game = new Game();
    this.renderer = new Renderer(canvas);

  };

  App.prototype = {

    set title(title) {
      document.title = title;
    }

  };

  return App;

});
