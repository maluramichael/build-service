const express = require('express');
const app = express();

const registerRoutes = require('./routes');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "X-Total-Count");

  res.setElements = function (count) {
    res.header("X-Total-Count", count || 0);
  }

  next();
});

registerRoutes(app).then(() => {
  console.log('All modules loaded');
});

app.listen(9000, function () {
  console.log('Server started');
});