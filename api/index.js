const express = require('express');
const async = require('async');

const winston = require('winston');
const expressWinston = require('express-winston');

const bodyParser = require('body-parser')
const app = express();

const db = require('./db');
const registerRoutes = require('./routes');

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT, HEAD");
  res.header("Access-Control-Expose-Headers", "X-Total-Count");

  res.setElements = function (count) {
    res.header("X-Total-Count", count || 0);
  }

  next();
});

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: false
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) {
    return req.method === 'OPTIONS';
  } // optional: allows to skip some log messages based on request and/or response
}));

function loadModels(done) {
  db.sync().then(() => {
    console.log('Models synced');
    done(null);
  }).catch(error => {
    done('Could not sync all models');
  });
}

function loadRoutes(done) {
  registerRoutes(app, db).then(() => {
    console.log('Routes loaded');
    done(null);
  }).catch(error => {
    done('Could not load all routes');
  });
}

function startServer() {
  app.listen(9000, function () {
    console.log('Server started');
  });
}

async.series([loadModels, loadRoutes], function (error) {
  if (error) {
    console.error(error);
  } else {
    startServer();
  }
});