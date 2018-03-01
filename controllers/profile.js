const User = require('../models/user');

function profileShow(req, res, next) {
  User
    .find({createdBy: req.user.id})
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch(next);
}

module.exports = {
  show: profileShow
};
