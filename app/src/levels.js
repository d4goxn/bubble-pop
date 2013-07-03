define(['jquery'], function($) {
  'use strict';

  return {

    query: function() {
      return $.get('data/levels.json');
    },

    load: function(name) {
      return $.get('data/' + name + '.json');
    }
  };
});
