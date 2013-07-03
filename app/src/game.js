define(function() {
  'use strict';

  function Game() {

    this.running = false;
    this.objects = {}; // id -> object model
    this.birth = Date.now() * 0.001;
  }

  Game.prototype = {

    bindView: function(element) {

      this.canvas = element;
    
      return this;
    },

    start: function() {
    
      console.log("Running");
      this.running = true;

      this.animate();
    },

    spawn: function(object) {

      var id = this.createId();
      this.objects[id] = object;

      return id;
    },

    animate: function() {

      if(!this.running) return;

      var expiredObjectIds = [];

      for(var objectId in this.objects) {
        var object = this.objects[objectId];

        if(object.model.expired)
          expiredObjectIds.push(objectId);
      }

      while(expiredObjectIds.length) {
        var id = expiredObjectIds.pop();
        delete(this.objects[id]);
      }

      requestAnimationFrame(this.animate);
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
    }
  };

  return Game;
});
