const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Pre-Meal', 'Post-Meal', 'Activity-Related', 'Emergency'] // Ensure this is in sync with your requirement
  }
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;
