const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const walkSchema = mongoose.Schema({
  start: {},
  end: {},
  distance: { type: Number },
  duration: {type: String},
  name: {type: String},
  date: { type: String }
});

walkSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});


const dogSchema = mongoose.Schema({
  name: {type: String, required: 'Please enter a name'},
  breed: {type: String, required: 'Please select a breed'},
  age: {type: Number, required: 'Please enter an age'},
  sex: {type: String, required: 'Please select a sex'},
  image: {type: String, required: 'Load a photo'},
  walks: [walkSchema]
});


dogSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

dogSchema.methodsbelongsTo = function belongsTo(user) {
  return user._id.equals(this.ownedBy.id);
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: 'Please enter your name'},
  username: {type: String, required: 'Please enter your username'},
  email: {type: String, required: 'Please enter a valid email address'},
  password: {type: String, required: 'Please choose a password'},
  dogs: [dogSchema]
});

userSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
    delete json.password;
  }
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && (!this._passwordConfirmation || this._passwordConfirmation !== this.password)) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});


userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});


userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
