define(['jquery'], function($) {
  'use strict';

  return {

    query: function() {

      var onSuccess;
      var promise = {
        success: function(callback) {
          onSuccess = callback;
        }
      };

      $.get('data/levels.json')
      .success(function(data) {
        onSuccess(data);
      });

      return promise;
    },

    load: function(name) {

      var onSuccess;
      var promise = {
        success: function(callback) {
          onSuccess = callback;
        }
      };

      $.get('data/' + name + '.json')
      .success(function(data) {
        onSuccess(data);
      });

      return promise;
    }
  };
});
