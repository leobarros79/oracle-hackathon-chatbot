"use strict";

var components = require('./components.js'),
    server = components('/components');

server.listen(process.env.PORT || 7950, function () {
        console.log('Listening on ' + process.env.PORT);
    });

