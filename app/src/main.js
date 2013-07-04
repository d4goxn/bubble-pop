requirejs.config({
  paths: {
    'jquery': '../lib/jquery'
  }
});

define(['jquery'], function ($) {
  'use strict';

  var canvas = $('canvas#display')[0];

  canvas.width = $(window).width();
  canvas.height = $(window).height();

  var ctx = canvas.getContext('2d');

  var bubble = {
    image: new Image(),
    x: 100,
    y: 100,
    width: 0,
    height: 0
  };

  bubble.image.onload = function() {

    console.log('loaded');
    bubble.width = bubble.image.width;
    bubble.height = bubble.image.height;
    ctx.drawImage(bubble.image, bubble.x, bubble.y, bubble.width, bubble.height);

  };

  bubble.image.src = 'images/bubble.png';


  ctx.fillStyle = '#aaf';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

});
