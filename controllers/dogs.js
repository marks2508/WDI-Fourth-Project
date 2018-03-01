const Dog = require('../models/user');
const User = require('../models/user');

function dogsIndex(req, res, next) {
  Dog
    .find({createdBy: req.user.id})
    .exec()
    .then((dog) => {
      if(!dog) res.notFound();
      res.json(dog);
    })
    .catch(next);
}

function dogsCreate(req, res, next) {
  // req.body.createdBy = req.user;
  // Dog
  //   .create(req.body)
  //   .then(dog => res.status(201).json(dog))
  //   .catch(next);
  User
    .findById(req.currentUser._id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();

      const dog = user.dogs.create(req.body);
      user.dogs.push(dog);
      return user.save()
        .then(() => res.json(dog));
    })
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
  index: dogsIndex,
  create: dogsCreate,
  show: dogsShow,
  update: dogsUpdate,
  delete: dogsDelete
};
