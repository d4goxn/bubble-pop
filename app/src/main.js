requirejs.config({
  paths: {
    'jquery': '../lib/jquery',
    'promise-simple': '../lib/promise-simple'
  }
});

define(['bubble', 'popout', 'promise-simple', 'jquery'], function (Bubble, Popout, Promise, $) {
  'use strict';

  var $canvas = $('canvas#display');
  var canvas = $canvas[0];

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

  ctx.rect(0, 0, canvas.width, canvas.height);
  var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#53bcd9');
  gradient.addColorStop(1, '#c1e1bc');

  function animate(scene) {
    function loop() {

      if(!running) return;

      ctx.fillStyle = gradient;
      ctx.fill();

      for(var spriteId in scene.sprites) {
        var sprite = scene.sprites[spriteId];

        ctx.drawImage(
          sprite.image,
          sprite.x, sprite.y,
          sprite.image.width, sprite.image.height
        );
      }

      requestAnimationFrame(loop);
    }

    loop();
  }

  // When the canvas is clicked, call the click handler with coordinates relative to the canvas.
  function bindClickHandler(handler) {
    var BUTTON_LEFT = 0;

    $canvas.mousedown(function(event) {
      if(event.button === BUTTON_LEFT) {

        var x = event.pageX - $(this).position().left;
        var y = event.pageY - $(this).position().top;

        handler({
          x: x,
          y: y
        });
      }
    });
  }

  // Return a unique id.
  var nextId = (function() {
    var currentId = 0;

    return function() {
      return ++currentId;
    };
  })();

  function Scene() {

    this.sprites = {};

  }

  Scene.prototype = {

    add: function(sprite) {
      var id = nextId();
      this.sprites[id] = sprite;
      return id;
    },

    click: function(point) {
      for(var spriteId in this.sprites) {
        var sprite = this.sprites[spriteId];

        if(
          sprite.intersectsPoint &&
          sprite.intersectsPoint(point) &&
          sprite.click
        ) {
          sprite.click(point);
        }
      }
    },

    pop: function(bubble) {
      delete this.sprites[bubble.id];

      var context = this;
      var popout = new Popout(bubble.center, popImage, 2, function(popout) {
        context.expire(popout);
      });
      popout.id = this.add(popout);
      console.log('A bubble popped.');
    },

    expire: function(sprite) {
      delete this.sprites[sprite.id];
    }
  };

  var bubbleImage = new Image();
  var popImage = new Image();

  // Wait for the image to load, then create the game objects and start animating.
  Promise.when(
    imageWaiter(bubbleImage),
    imageWaiter(popImage)
  ).then(function() {
    
    var scene = new Scene();
    var bubble = new Bubble(bounds, bubbleImage, function(bubble) {
      scene.pop(bubble);
    });

    window.hitCeiling = function() {
      bubble.hitCeiling();
    };

    bubble.id = scene.add(bubble);

    bindClickHandler(function(point) {
      scene.click(point);
    });

    animate(scene);
  });

  bubbleImage.src = 'images/bubble.png';
  popImage.src = 'images/pop.png';

});
