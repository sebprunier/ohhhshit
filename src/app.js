'use strict'

var conf = require('../conf/conf');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', conf.PORT);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'pages')));

// Configure routes
app.get('/code/random', function (req, res) {
    // TODO use MongoDB backend
    res.send({
        code: 'random'
    });
})

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
