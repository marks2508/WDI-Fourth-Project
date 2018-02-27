const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({
  name: {type: String, required: 'Please enter a name'},
  breed: {type: String, required: 'Please select a breed'},
  age: {type: String, required: 'Please enter an age'},
  sex: {type: String, required: 'Please select a sex'},
  image: {type: String, required: 'Load a photo'}  
});

dogSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('dog', dogSchema);
