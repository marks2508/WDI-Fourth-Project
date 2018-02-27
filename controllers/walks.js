const Walk = require('../models/walk');

function walksIndex(req, res, next) {
  Walk
    .find()
    .exec()
    .then(walks => res.json(walks))
    .catch(next);
}

function walksCreate(req, res, next) {
  Walk
    .create(req.body)
    .then(walk => res.status(201).json(walk))
    .catch(next);
}

function walksShow(req, res, next) {
  Walk
    .findById(req.params.id)
    .exec()
    .then((walk) => {
      if(!walk) return res.notFound();
      res.json(walk);
    })
    .catch(next);
}

function walksUpdate(req, res, next) {
  Walk
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(walk => res.status(200).json(walk))
    .catch(next);
}

function walksDelete(req, res, next) {
  Walk
    .findById(req.params.id)
    .exec()
    .then((walk) => {
      if(!walk) return res.notFound();
      return walk.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: walksIndex,
  create: walksCreate,
  show: walksShow,
  update: walksUpdate,
  delete: walksDelete
};
