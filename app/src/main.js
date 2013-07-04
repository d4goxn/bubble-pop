requirejs.config({
  paths: {
    'jquery': '../lib/jquery',
    'promise-simple': '../lib/promise-simple'
  }
});

define(['promise-simple', 'jquery'], function (Promise, $) {
  'use strict';

  var canvas = $('canvas#display')[0];

  canvas.width = $(window).width();
  canvas.height = $(window).height();

  var ctx = canvas.getContext('2d');

  function LinearMotion(scale, offset) {

    this.birth = Date.now();
    this.offset = offset;
    this.scale = scale;

  }

  LinearMotion.prototype = {
    get value() {
      return this.scale * (Date.now() - this.birth) + this.offset;
    }
  };

  var bubbleRise = new LinearMotion(-0.025, canvas.height + 25);

  var bubble = {
    image: new Image(),
    x: 100,

    get y() { return bubbleRise.value; },

    width: 0,
    height: 0,

    render: function(ctx) {

      ctx.drawImage(
        bubble.image,
        bubble.x, bubble.y,
        bubble.width, bubble.height
      );

    }
  };

  function waitForImage() {

    var deferred = Promise.defer();

    bubble.image.onload = function() {

      bubble.width = bubble.image.width;
      bubble.height = bubble.image.height;


      deferred.resolve();

    };

    return deferred;
  }

  bubble.image.src = 'images/bubble.png';


  var running = true;

  function animate() {

    if(!running) return;

    ctx.fillStyle = '#aaf';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      bubble.image,
      bubble.x, bubble.y,
      bubble.width, bubble.height
    );

    requestAnimationFrame(animate);
  }

  Promise.when(waitForImage).then(function() {
    
    animate();
  });

});
