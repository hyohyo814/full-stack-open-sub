import express from 'express';
import patientService from '../services/patientService';
import patientDataParser from '../utils/patientDataParser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getData());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getOne(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientDataParser(req.body);
    console.log(newPatient);
    const appendedEntry = patientService.postData(newPatient);
    console.log(appendedEntry);
    res.status(201).json(appendedEntry);
  } catch (error: unknown) {
    let errorMessage = 'An error has occurred.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;