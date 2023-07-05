import { NewPatient, EntryWithoutId } from '../types';
import { parseDate, parseGender, parseString, parseSsn } from './helpers';
import entriesParser from './patientEntriesParser';

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
    const entries: EntryWithoutId[] = [];
    if ('entries' in obj && obj.entries instanceof Array) {
      obj.entries.forEach((entry: EntryWithoutId) => {
        const append = entriesParser(entry);
        console.log(obj.name);
        console.log(append);
        if (append) {
          entries.push(append);
          console.log(entries);
        }
      });
    }
    const newEntry: NewPatient = {
      name: parseString(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseString(obj.occupation),
      entries: entries,
    };
    return newEntry;
  }
  throw new Error('All fields must be filled');
};

export default AcceptedPatientEntry;
