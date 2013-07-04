requirejs.config({
  paths: {
    'jquery': '../lib/jquery',
    'promise-simple': '../lib/promise-simple'
  }
});

define(['bubble', 'promise-simple', 'jquery'], function (Bubble, Promise, $) {
  'use strict';

  var canvas = $('canvas#display')[0];

  canvas.width = $(window).width();
  canvas.height = $(window).height();

  var ctx = canvas.getContext('2d');

  var bounds = {
    get width() { return canvas.width; },
    get height() { return canvas.height; },
  };


  // Returns a function that will resolve a waiting promise when an image has loaded.
  function imageWaiter(image) {
    return function() {

      var deferred = Promise.defer();

      image.onload = function() {
        deferred.resolve();
      };

      return deferred;
    };
  }

  var running = true;

  function animate(sprites) {
    function loop() {

      if(!running) return;

      ctx.fillStyle = '#aaf';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for(var spriteId in sprites) {
        var sprite = sprites[spriteId];

        ctx.drawImage(
          sprite.image,
          sprite.x, sprite.y,
          sprite.width, sprite.height
        );
      }

      requestAnimationFrame(loop);
    }

    loop();
  }

  var image = new Image();

  // Wait for the image to load, then create the game objects and start animating.
  Promise.when(imageWaiter(image)).then(function() {
    
    var bubble = new Bubble(bounds, image);

    animate({
      0: bubble
    });
  });

  image.src = 'images/bubble.png';

});
