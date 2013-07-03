define(['app', 'jquery'], function(App, $) {
  'use strict';

  describe('just checking', function() {

    it('has got game', function() {

      var mockCanvas = {
        getContext: function(id) {
          expect(id).toEqual('2d');

          return {};
        }
      };

      var app = new App(mockCanvas);

      expect(app.game).toBeDefined();
    });

  });

});
