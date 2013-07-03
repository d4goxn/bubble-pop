requirejs.config({
    paths: {
        'jquery': '../lib/jquery',
    }
});

define(['app', 'jquery'], function (App, $) {
    var app = new App($('body'));
    app.render();
});
