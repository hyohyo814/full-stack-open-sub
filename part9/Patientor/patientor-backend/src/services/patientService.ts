import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import {
  Patient,
  PatientNonSensitive,
  NewPatient,
  NewPatientNoEntries,
  EntryWithoutId,
  Entry
} from '../types';

const patientsData: Patient[] = patients;

const getData = (): PatientNonSensitive[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getOne = (id: string): Patient => {
  const result = patients.find((target) => target.id === id);
  if (!result) {
    throw new Error('Could not find patient with id ' + id);
  }
  return result;
};

const getEntries = (id: string): Entry[] => {
  const result = patients.find((target) => target.id === id);
  if (!result) {
    throw new Error('Could not find patient with id ' + id);
  }
  return result.entries;
};

const postData = (entry: NewPatient): NewPatientNoEntries => {
  const newPatient = {
    ...entry,
    id: uuidv4(),
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

const postEntry = (id: string, entry: EntryWithoutId) => {
  const target = patients.find((target) => target.id === id);
  if (!target) {
    throw new Error('Could not find patient with id ' + id);
  }
  const newEntry = {
    ...entry,
    id: uuidv4(),
  };

  const updTarget = {
    ...target,
    entries: target.entries.push(newEntry),
  };

  return patients.map((v) => (v.id === id ? updTarget : v));
};

export default {
  getData,
  getEntries,
  postData,
  getOne,
  postEntry,
};
