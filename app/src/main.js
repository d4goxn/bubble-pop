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

  function now() {
    return Date.now() * 0.001;
  }

  function LinearMotion(scale, offset) {

    this.birth = now();
    this.offset = offset;
    this.scale = scale;

  }

  LinearMotion.prototype = {
    get value() {
      var time = now() - this.birth;
      return this.scale * time + this.offset;
    }
  };

  function SineMotion(range, scale, offset) {

    this.birth = now();
    this.range = range;
    this.scale = scale;
    this.offset = offset;

  }

  SineMotion.prototype = {
    get value() {
      var time = now() - this.birth;
      return this.range * Math.sin(time * this.scale) + this.offset;
    }
  };

  var bubbleRise = new LinearMotion(-5, canvas.height + 0);
  var bubbleSwing = new SineMotion(canvas.width * 0.25, 0.25, canvas.width * 0.5);

  var bubble = {

    image: new Image(),
    get x() { return bubbleSwing.value; },
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
