const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { db, env } = require('../config/environment');
const User      = require('../models/user');

User.collection.drop();

const dogData = [
  {
    name: 'Boris',
    breed: 'Puggle',
    age: 6,
    sex: 'Male',
    image: 'https://s-media-cache-ak0.pinimg.com/originals/50/c6/61/50c6615f575b06ecc988064705457ad7.jpg'
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
