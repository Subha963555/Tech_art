const mongoose = require('mongoose');
require('dotenv').config();  

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connection established');
}).catch((error) => {
  console.log('Connection Error', error);
});

const employeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  roll: {
    type: Number,
    required: true,
    unique: true
  },
  section: {
    type: String,
    required: true,
    unique: true
  },
  reg: {
    type: String,
    required: true,
    unique: true
  }
});

const Register = mongoose.model('Register', employeSchema);

module.exports = { Register };
