/**
 * Created by root on 8/5/14.
 */
var express = require('express'),
    app = express();
var path = require('path');

var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)

app.use(express.static('./app'));

//create http server liston on 3000
var httpServer = http.createServer(app);

httpServer.listen(3000);

console.log('Express http server started on http://127.0.0.1:3000/  ');

module.exports = app;