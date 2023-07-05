import express from 'express';
import patientService from '../services/patientService';
import patientDataParser from '../utils/patientDataParser';
import entriesParser from '../utils/patientEntriesParser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getData());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getOne(req.params.id));
});

router.get('/:id/entries', (req, res) => {
  res.send(patientService.getEntries(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientDataParser(req.body);
    const appendedEntry = patientService.postData(newPatient);
    res.status(201).json(appendedEntry);
  } catch (error: unknown) {
    let errorMessage = 'An error has occurred.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = entriesParser(req.body);
    if (newEntry) {
      res.send(patientService.postEntry(req.params.id, newEntry));
    }
  } catch (error: unknown) {
    let errorMessage = 'An error has occurred.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;