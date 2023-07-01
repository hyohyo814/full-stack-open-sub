import patients from '../../data/patients';
import { PatientNonSensitive } from '../types';

const getData = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getData
};