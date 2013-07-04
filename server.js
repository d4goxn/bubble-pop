'use strict';

var express = require('express');

var server = express();

server.configure(function() {
  server.use(express.static(__dirname + '/app'));
});

server.listen(process.env.VCAP_APP_PORT || 3000);
