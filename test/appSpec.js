define(['app', 'jquery'], function(App, $) {

  describe('just checking', function() {

    it('has got game', function() {

      var $display = $('<canvas id="display"></canvas>');
      var app = new App($display);

      expect(app.game).toBeDefined();
    });

  });

});
