const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Medication = require('./models/medicationModel');
const Patient = require('./models/patientModel');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB Connection URI
const mongoURI = 'mongodb+srv://admin:KqIDJKJxnavIVypc@testdata.cgftf.mongodb.net/yourDatabaseName';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Optional: Configure additional options if needed
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// CRUD Endpoints

// Create Medication Entry
app.post('/medications', async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).send(medication);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read All Medication Entries
app.get('/medications', async (req, res) => {
  try {
    const medications = await Medication.find();
    res.send(medications);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read Medication Entry by ID
app.get('/medications/:id', async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    if (!medication) {
      return res.status(404).send();
    }
    res.send(medication);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Medication Entry by ID
app.patch('/medications/:id', async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!medication) {
      return res.status(404).send();
    }
    res.send(medication);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Medication Entry by ID
app.delete('/medications/:id', async (req, res) => {
  try {
    const medication = await Medication.findByIdAndDelete(req.params.id);
    if (!medication) {
      return res.status(404).send();
    }
    res.send(medication);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read All Patient Entries
app.get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.send(patients);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
