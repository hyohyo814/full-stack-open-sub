import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { Patient, PatientNonSensitive, NewPatient, NewPatientNoEntries } from '../types';

const patientsData: Patient[] = patients;

const getData = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getOne = (id: string): Patient => {
  const result = patients.find(target => target.id === id);
  if (result) {
    return result;
  }
  throw new Error('Could not find patient with id ' + id);
};


const postData = ( entry: NewPatient ): NewPatientNoEntries => {

  const newPatient = {
    ...entry,
    id: uuidv4(),
    entries: []
  };

  patientsData.push(newPatient);
  return newPatient;
};


export default {
  getData,
  postData,
  getOne
};