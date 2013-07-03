define(function() {
  'use strict';

  function Game() {

    this.running = false;
    this.objects = {}; // id -> object model
    this.birth = Date.now() * 0.001;

  }

  Game.prototype = {

    start: function(renderer) {
    
      console.log("Running");
      this.running = true;

      this.animate(renderer);
    },

    spawn: function(object) {

      var id = this.createId();
      this.objects[id] = object;

      return id;
    },

    animate: function(renderer) {

      var game = this;

      function animate() {

        if(!game.running) return;
        game.removeExpiredObjects();
        renderer.renderFrame(game.objects);

        requestAnimationFrame(animate);
      }

      animate();
    },

    removeExpiredObjects: function() {

      var expiredObjectIds = [];

      for(var objectId in this.objects) {
        var object = this.objects[objectId];

        if(object.expired)
          expiredObjectIds.push(objectId);
      }

      while(expiredObjectIds.length) {
        var id = expiredObjectIds.pop();
        delete(this.objects[id]);
      }
    },

    createId: (function() {
      var currentId = 0;

      return function() {
        // Return the next unused id. 
        return ++currentId;
      };
    })(),

    get time() {
      return Date.now() * 0.001 - this.birth;
    },
  };

  return Game;
});
