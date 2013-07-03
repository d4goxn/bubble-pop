define(['game'], function(Game) {
  'use strict';

  var App = function(canvas) {

    this.game = new Game();
    this.game.bindView(canvas);
  };

  return App;

});
