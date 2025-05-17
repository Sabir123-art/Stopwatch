// const mongoose = require('mongoose');

// const sessionSchema = new mongoose.Schema({
//   startTime: Date,
//   endTime: Date,
//   duration: Number
// });

// module.exports = mongoose.model('Session', sessionSchema);


const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  startTime: Date,
  duration: Number // seconds
});

module.exports = mongoose.model('Session', sessionSchema);
