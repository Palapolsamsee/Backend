const mongoose = require('mongoose');

// Define Schema
const medicationSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  medicationName: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  schedule: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create Model
const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;
