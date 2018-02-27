const Dog = require('../models/dog');

function dogsCreate(req, res, next) {
  Dog
    .create(req.body)
    .then(dog => res.status(201).json(dog))
    .catch(next);
}

function dogsShow(req, res, next) {
  Dog
    .findById(req.params.id)
    .exec()
    .then((dog) => {
      if(!dog) return res.notFound();
      res.json(dog);
    })
    .catch(next);
}

function dogsUpdate(req, res, next) {
  Dog
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(dog => res.status(200).json(dog))
    .catch(next);
}

function dogsDelete(req, res, next) {
  Dog
    .findById(req.params.id)
    .exec()
    .then((dog) => {
      if(!dog) return res.notFound();
      return dog.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: dogsCreate,
  show: dogsShow,
  update: dogsUpdate,
  delete: dogsDelete
};
