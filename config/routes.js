const router = require('express').Router();
const walks = require('../controllers/walks');
const dogs = require('../controllers/dogs');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/dogs')
  .post(secureRoute, dogs.create);

router.route('/dogs/:id')
  .get(secureRoute, dogs.show)
  .put(dogs.update)
  .delete(dogs.delete);

router.route('/dogs/:id/walks')
  .post(secureRoute, dogs.addWalk);

router.route('/dogs/:dogId/walks/:walkId')
  .get(secureRoute, walks.show)
  .put(secureRoute, walks.update)
  .delete(secureRoute, walks.delete);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
