const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { db, env } = require('../config/environment');
const User      = require('../models/user');
// const Dog = require('../models/dog');

User.collection.drop();
// Dog.collection.drop();

const dogData = [
  {
    name: 'Boris',
    breed: 'Puggle',
    age: 6,
    sex: 'male',
    image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/puggle-dog-breed-picture-gallery/face-3.jpg'
  }
];

const userData = [{
  name: 'Mark',
  username: 'Mark',
  email: 'm@m',
  password: 'm',
  passwordConfirmation: 'm',
  dogs: [dogData[0]]
}];

mongoose.connect(db[env])
  .then(() => User.create(userData))
  .then(users => console.log(`${users.length} users created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
