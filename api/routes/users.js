const express = require('express');


module.exports = function (app) {
  const users = express.Router();
  users.get('/', function (req, res) {
    const data = [{
      id: 1,
      name: 'Michael'
    }];
    res.setElements(data.length);
    res.json(data);
  });

  app.use('/users', users);

  return true;
};