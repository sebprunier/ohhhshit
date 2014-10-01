'use strict'

var conf = require('../conf/conf');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var CodeHorrorService = require('./services/codeHorrorService');

var CodeHorrorRoutes = require('./routes/codeHorrorRoutes');

var app = express();

// Configure express app
app.set('port', conf.PORT);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'pages')));

// Create services and routes
var codeHorrorService = new CodeHorrorService();
var codeHorrorRoutes = new CodeHorrorRoutes(codeHorrorService);

// Configure routes
app.get('/api/codehorror/stats', codeHorrorRoutes.stats);
app.get('/api/codehorror/random', codeHorrorRoutes.iAmFeelingLucky);
app.get('/api/codehorror/latest', codeHorrorRoutes.latest);
app.get('/api/codehorror/:id', codeHorrorRoutes.get);
app.post('/api/codehorror', codeHorrorRoutes.create);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
