const Exercise = require('../models/exercise');

function exerciseShow(req, res, next) {
  Exercise
    .findById(req.params.id)
    .exec()
    .then((exercise) => {
      if(!exercise) return res.notFound();
      res.json(exercise);
    })
    .catch(next);
}

module.exports = {
  show: exerciseShow
};
