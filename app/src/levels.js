define(function() {
  'use strict';

  return {

    queryLevels: function(ready) {
    
      $.get('data/levels.json')
      .success(function(data) {
        ready(JSON.parse(data));
      });

    },

    loadLevel: function(name, ready) {

      $.get('data/' + name + '.json')
      .success(function(data) {
        ready(JSON.parse(data));
      });

    }
  };
});
