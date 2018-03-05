const Dog = require('../models/user');
const User = require('../models/user');

function dogsCreate(req, res, next) {
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
  User
    .findById(req.currentUser.id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();
      const dog = user.dogs.id(req.params.id);
      return res.status(200).json(dog);
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

function dogsWalksCreate(req, res, next) {
  req.body.distance = parseFloat(req.body.distance);
  User
    .findById(req.currentUser._id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();
      const dog  = user.dogs.id(req.params.id);
      const walk = dog.walks.create(req.body);
      dog.walks.push(walk);
      user.save();
      return walk;
    })
    .then(walk => res.status(201).json(walk))
    .catch(next);
}

module.exports = {
  create: dogsCreate,
  show: dogsShow,
  update: dogsUpdate,
  delete: dogsDelete,
  addWalk: dogsWalksCreate
};
