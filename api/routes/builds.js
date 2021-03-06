const express = require('express');

const {
  Get,
  List,
  Create,
  Delete,
  Update
} = require('../routeHelper');

module.exports = function (app, db) {
  const Model = db.models.Build;

  const router = express.Router();
  router.get('/', List(Model));
  router.get('/:id', Get(Model))
  router.post('/', Create(Model));
  router.put('/:id', Update(Model));
  router.delete('/:id', Delete(Model))

  app.use('/builds', router);
  return true;
};