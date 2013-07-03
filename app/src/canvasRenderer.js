define(function() {
  'use strict';

  function Renderer(canvas) {

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

  }

  Renderer.prototype = {

    renderFrame: function(objects) {

      this.ctx.clearRect();

      for(var objectId in objects)
        this.renderObject(objects[objectId]);

    },

    renderObject: function(object) {

      this.ctx.drawImage(object.image, object.x, object.y);

    },

    bounds: {
      get width() {
        return this.canvas.width;
      },

      get height() {
        return this.canvas.height;
      }
    }

  };

  return Renderer;
});
