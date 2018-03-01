const User = require('../models/user');

function usersShow(req,res,next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function usersUpdate(req,res,next) {
  User
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(user => res.status(200).json(user))
    .catch(next);
}

module.exports = {
  show: usersShow,
  update: usersUpdate
};
