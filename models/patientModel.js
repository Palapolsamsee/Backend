const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  medicalHistory: {
    type: String,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model('Patient', patientSchema);
