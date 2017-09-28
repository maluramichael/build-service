const express = require('express');


module.exports = function (app) {
  const router = express.Router();
  router.get('/', function (req, res) {
    const data = [{
      id: 1,
      name: 'Gemuzzle'
    }];
    res.setElements(data.length);
    res.json(data);
  });

  app.use('/router', router);

  return true;
};