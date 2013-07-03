define(['app', 'jquery'], function(App, $) {

    describe('just checking', function() {

        it('works for app', function() {
            var el = $('<div></div>');

            var app = new App(el);
            app.render();

            expect(el.text()).toEqual('require.js up and running');
        });

    });

});
