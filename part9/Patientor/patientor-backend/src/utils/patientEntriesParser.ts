import { EntryWithoutId } from '../types';
import {
  parseDate,
  parseString,
  parseType,
  parseStringArr,
  parseRating,
} from './helpers';

const entriesParser = (entry: unknown): EntryWithoutId | null => {
  if (!entry || typeof entry !== 'object') {
    throw new Error(`Invalid input for entry: "${entry}`);
  }
  if (
    'type' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'description' in entry
  ) {
    switch (entry.type) {
      case 'Hospital':
        if (
          'discharge' in entry &&
          entry.discharge &&
          typeof entry.discharge === 'object' &&
          'date' in entry.discharge &&
          'criteria' in entry.discharge
        ) {
          let entryHosp = <EntryWithoutId>{
            date: parseDate(entry.date),
            type: parseType(entry.type),
            specialist: parseString(entry.specialist),
            description: parseString(entry.description),
            discharge: {
              date: parseDate(entry.discharge.date),
              criteria: parseString(entry.discharge.criteria),
            },
          };

          if ('diagnosisCodes' in entry) {
            console.log('diagnosisCodes exists');
            entryHosp = {
              ...entryHosp,
              diagnosisCodes: parseStringArr(entry.diagnosisCodes),
            };
          }

          return entryHosp;
        }
        return null;
      case 'OccupationalHealthcare':
        if ('employerName' in entry) {
          let entryOcc = <EntryWithoutId>{
            date: parseDate(entry.date),
            type: parseType(entry.type),
            specialist: parseString(entry.specialist),
            employerName: parseString(entry.employerName),
            description: parseString(entry.description),
          };

          if ('diagnosisCodes' in entry) {
            console.log('diagnosisCodes exists');
            entryOcc = {
              ...entryOcc,
              diagnosisCodes: parseStringArr(entry.diagnosisCodes),
            };
          }

          if (
            'sickLeave' in entry &&
            typeof entry.sickLeave === 'object' &&
            entry.sickLeave &&
            'startDate' in entry.sickLeave &&
            'endDate' in entry.sickLeave
          ) {
            console.log('sickLeave exists');
            entryOcc = {
              ...entryOcc,
              sickLeave: {
                startDate: parseDate(entry.sickLeave.startDate),
                endDate: parseDate(entry.sickLeave.endDate),
              },
            };
          }

          return entryOcc;
        }
        return null;
      case 'HealthCheck':
        if ('healthCheckRating' in entry) {
          let entryHch = <EntryWithoutId>{
            date: parseDate(entry.date),
            type: parseType(entry.type),
            specialist: parseString(entry.specialist),
            description: parseString(entry.description),
            healthCheckRating: parseRating(entry.healthCheckRating),
          };

          if ('diagnosisCodes' in entry) {
            console.log('diagnosisCodes exists');
            entryHch = {
              ...entryHch,
              diagnosisCodes: parseStringArr(entry.diagnosisCodes),
            };
          }

          return entryHch;
        }
        return null;
      default:
        throw new Error('Invalid type ' + entry.type);
    }
  }
  throw new Error('Unable to parse entry');
};

export default entriesParser;
