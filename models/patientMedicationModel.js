const mongoose = require('mongoose');

const patientMedicationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication',
    required: true,
  },
  doseTaken: {
    type: String,
    required: true,
  },
  takenAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Taken', 'Missed', 'Skipped'],
    required: true,
  },
});

module.exports = mongoose.model('PatientMedication', patientMedicationSchema);
