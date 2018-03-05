const User = require('../models/user');

function walksIndex(req, res, next) {
  User
    .find()
    .exec()
    .then(walks => res.json(walks))
    .catch(next);
}

function walksCreate(req, res, next) {
  req.body.date     = new Date();
  req.body.distance = parseFloat(req.body.distance);

  User
    .findById(req.currentUser._id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();
      const walk = user.walks.create(req.body);
      user.walks.push(walk);

      user.save();
      return walk;
    })
    .then(walk => res.status(201).json(walk))
    .catch(next);
}

function walksShow(req, res, next) {
  User
    .findById(req.currentUser._id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      const dog = user.dogs.id(req.params.dogId);
      const walk = dog.walks.id(req.params.walkId);
      res.json(walk);
    })
    .catch(next);
}

// TODO update this route
function walksUpdate(req, res, next) {
  User
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(walk => res.status(200).json(walk))
    .catch(next);
}

function walksDelete(req, res, next) {
  User
    .findById(req.currentUser._id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      const walk = user.walks.id(req.params.id);
      walk.remove();
      return user.save();
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
