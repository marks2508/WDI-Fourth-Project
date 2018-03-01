const router = require('express').Router();

const walks = require('../controllers/walks');
const dogs = require('../controllers/dogs');
const users = require('../controllers/users');
// const profile = require('../controllers/profile');
// const exercise = require('../controllers/exercise');
const auth = require('../controllers/auth');

const secureRoute = require('../lib/secureRoute');

// routes go here
router.route('/walks')
  .get(walks.index)
  .post(secureRoute, walks.create);

router.route('/walks/:id')
  .get(secureRoute, walks.show)
  .put(secureRoute, walks.update)
  .delete(secureRoute, walks.delete);

router.route('/dogs')
  .get(dogs.index)
  .post(secureRoute, dogs.create);

router.route('/dogs/:id')
  .get(dogs.show)
  .put(dogs.update)
  .delete(dogs.delete);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);



// router.route('/dogs/:id/exercise')
//   .get(exercise.show);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
