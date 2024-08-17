const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Medication = require('./models/medicationModel');
const Patient = require('./models/patientModel');
const PatientMedication = require('./models/patientMedicationModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB Connection URI
const mongoURI = 'mongodb+srv://admin:KqIDJKJxnavIVypc@testdata.cgftf.mongodb.net/yourDatabaseName';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});


// Create a new patient
app.post('/patients', async (req, res) => {
    try {
      const patient = new Patient(req.body);
      await patient.save();
      res.status(201).send(patient);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  
  // Create a new medication
app.post('/medications', async (req, res) => {
    try {
      const medication = new Medication(req.body);
      await medication.save();
      res.status(201).send(medication);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  // Create a PatientMedication entry
app.post('/patient-medications', async (req, res) => {
    try {
      const { patientId, medicationId, doseTaken, takenAt, status } = req.body;
  
      // Validate if patient and medication exist
      const patient = await Patient.findById(patientId);
      if (!patient) return res.status(404).send({ message: 'Patient not found' });
  
      const medication = await Medication.findById(medicationId);
      if (!medication) return res.status(404).send({ message: 'Medication not found' });
  
      // Create PatientMedication Entry
      const newPatientMedication = new PatientMedication({
        patient: patientId,
        medication: medicationId,
        doseTaken,
        takenAt,
        status
      });
  
      await newPatientMedication.save();
      res.status(201).send(newPatientMedication);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Read all PatientMedication entries
app.get('/patient-medications', async (req, res) => {
    try {
      const patientMedications = await PatientMedication.find()
        .populate('patient')
        .populate('medication');
      res.send(patientMedications);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Read a specific PatientMedication entry by ID
  app.get('/patient-medications/:id', async (req, res) => {
    try {
      const patientMedication = await PatientMedication.findById(req.params.id)
        .populate('patient')
        .populate('medication');
      if (!patientMedication) {
        return res.status(404).send({ message: 'PatientMedication not found' });
      }
      res.send(patientMedication);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Update a PatientMedication entry by ID
app.patch('/patient-medications/:id', async (req, res) => {
    try {
      const patientMedication = await PatientMedication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .populate('patient')
        .populate('medication');
      if (!patientMedication) {
        return res.status(404).send({ message: 'PatientMedication not found' });
      }
      res.send(patientMedication);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  // Delete a PatientMedication entry by ID
app.delete('/patient-medications/:id', async (req, res) => {
    try {
      const patientMedication = await PatientMedication.findByIdAndDelete(req.params.id);
      if (!patientMedication) {
        return res.status(404).send({ message: 'PatientMedication not found' });
      }
      res.send(patientMedication);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  









app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
