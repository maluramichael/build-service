const createFilter = req => {
  const filter = {
    limit: Number(req.query._end) - Number(req.query._start),
    offset: Number(req.query._start),
    order: [
      [req.query._sort, req.query._order]
    ]
  }
  return filter;
}

const Get = Model => (req, res) => Model.findOne({
  where: {
    id: req.params.id
  }
}).then(result => {
  res.json(result);
});

const List = Model => (req, res) => Model.findAndCountAll(createFilter(req)).then(results => {
  res.setElements(results.count);
  res.json(results.rows);
}).catch(error => {
  res.status(500);
  res.json(error);
});

const Create = Model => (req, res) => Model.create(req.body).then(result => {
  res.json(result);
});

const Update = Model => (req, res) => Model.update(req.body, {
  where: {
    id: req.params.id
  }
}).then(result => {
  res.json(result);
});

const Delete = Model => (req, res) => Model.destroy({
  where: {
    id: req.params.id
  }
}).then(result => {
  res.json({});
});

module.exports = {
  Get,
  List,
  Create,
  Delete,
  Update
}