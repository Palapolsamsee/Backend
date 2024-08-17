const mongoose = require('mongoose');

// Define Schema for Patient
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    }
  },
  medicalHistory: {
    type: String
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create Model for Patient
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
