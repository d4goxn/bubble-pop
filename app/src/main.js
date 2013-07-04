requirejs.config({
  paths: {
    'jquery': '../lib/jquery',
    'promise-simple': '../lib/promise-simple'
  }
});

define(['linearCtrl', 'sineCtrl', 'promise-simple', 'jquery'], function (LinearCtrl, SineCtrl, Promise, $) {
  'use strict';

  var canvas = $('canvas#display')[0];

  canvas.width = $(window).width();
  canvas.height = $(window).height();

  var ctx = canvas.getContext('2d');

  var bubbleRise = new LinearCtrl(-5, canvas.height - 100);
  var bubbleSwing = new SineCtrl(canvas.width * 0.25, 0.25, canvas.width * 0.5);

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
