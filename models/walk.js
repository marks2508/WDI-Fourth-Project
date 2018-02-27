const mongoose = require('mongoose');

const walkSchema = mongoose.Schema({
  name: {type: String, required: 'Please give your walk a name'},
  area: {type: String, required: 'Please enter the area'},
  image: {type: String}
});

walkSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('walk', walkSchema);
