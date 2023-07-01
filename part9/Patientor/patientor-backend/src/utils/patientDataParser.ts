import { NewPatient, Gender } from '../types';

const isString = (s: unknown): s is string => {
  return typeof s === 'string' || s instanceof String;
};

const isDate = (s: string): boolean => {
  return Boolean(Date.parse(s));
};

const isGender = (s: string): s is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(s);
};

const parseString = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Invalid string input: ' + s);
  }
  return s;
};

const parseDate = (s: unknown): string => {
  const regex = new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!isDate || !isString(s) || !s || !regex.test(s)) {
    throw new Error('Invalid date input: ' + s);
  }
  return s;
};

const parseSsn = (s: unknown): string => {
  const regex = new RegExp(/^(\d{6})-(\w{3,4})$/);
  if (!s || !isString(s) || !regex.test(s)) {
    throw new Error('Invalid SSN input: ' + s);
  }
  return s;
};

const parseGender = (s: unknown): Gender => {
  if (!s || !isString(s) || !isGender(s)) {
    throw new Error('Invalid Gender input: ' + s);
  }
  return s;
};

const AcceptedPatientEntry = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Invalid or missing input query');
  }
  if (
    'name' in obj &&
    'dateOfBirth' in obj &&
    'ssn' in obj &&
    'gender' in obj &&
    'occupation' in obj
  ) {
    const newEntry: NewPatient = {
      name: parseString(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseString(obj.occupation),
    };
    return newEntry;
  }
  throw new Error('All fields must be filled');
};

export default AcceptedPatientEntry;
