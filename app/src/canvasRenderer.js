define(function() {
  'use strict';

  function Renderer(canvas) {

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    var self = this;
    this.bounds = {
      get width() {
        return self.canvas.width;
      },

      get height() {
        return self.canvas.height;
      }
    };

  }

  Renderer.prototype = {

    renderFrame: function(objects) {

      this.ctx.fillStyle = '#aaf';
      this.ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);

      for(var objectId in objects)
        this.renderObject(objects[objectId]);

    },

    renderObject: function(object) {

      this.ctx.drawImage(object.image, object.x, object.y);

    }

  };

  return Renderer;
});
