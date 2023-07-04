import {
  NewPatient,
  Gender,
  HealthCheckRating,
  EntryWithoutId,
  EntryType,
} from '../types';

const isString = (s: unknown): s is string => {
  return typeof s === 'string' || s instanceof String;
};

const isNumber = (s: unknown): s is number => {
  return typeof s === 'number' || s instanceof Number;
};

const isDate = (s: string): boolean => {
  return Boolean(Date.parse(s));
};

const isType = (s: string): s is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(s);
};

const isGender = (s: string): s is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(s);
};

const isRating = (s: number): s is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(s);
};

const parseString = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Invalid string input: ' + s);
  }
  return s;
};

const parseType = (s: unknown): EntryType => {
  if (!s || !isString(s) || !isType(s)) {
    throw new Error('Invalid entry type: ' + s);
  }
  return s;
};

const parseStringArr = (s: unknown) => {
  if (s instanceof Array) {
    const strArr: string[] = [];
    s.forEach(c => {
      return strArr.push(parseString(c));
    });
    return strArr;
  }
  return [];
};

const parseDate = (s: unknown): string => {
  const regex = new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!isDate || !isString(s) || !s || !regex.test(s)) {
    throw new Error(`Invalid date input: ${s}. Format: YYYY-MM-DD`);
  }
  return s;
};

const parseSsn = (s: unknown): string => {
  const regex = new RegExp(/^(\d{6})-(\w{3,4})$/);
  if (!s || !isString(s) || !regex.test(s)) {
    throw new Error(
      `Invalid SSN input: ${s}. Format: 6 digits proceeded by 3-4 alphanumerics`
    );
  }
  return s;
};

const parseGender = (s: unknown): Gender => {
  if (!s || !isString(s) || !isGender(s)) {
    throw new Error(
      `Invalid Gender input: ${s}. Available options: male, female, other`
    );
  }
  return s;
};

const parseRating = (s: unknown): HealthCheckRating => {
  if (!isNumber(s) || !isRating(s)) {
    throw new Error(`Invalid Rating input: ${s}. Available options: 0-3`);
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
    'occupation' in obj &&
    'entries' in obj &&
    obj.entries instanceof Array
  ) {
    console.log('BASE ENTRIES', obj.entries);
    const entriesArr: EntryWithoutId[] = [];
    obj.entries.map((v) => {
      switch (v.type) {
        case 'Hospital':
          let entryHosp = <EntryWithoutId>{
            date: parseDate(v.date),
            type: parseType(v.type),
            specialist: parseString(v.specialist),
            description: parseString(v.description),
            discharge: {
              date: parseDate(v.discharge.date),
              criteria: parseString(v.discharge.criteria),
            },
          };

          if (v.diagnosisCodes) {
            console.log('diagnosisCodes exists');
            entryHosp = {
              ...entryHosp,
              diagnosisCodes: parseStringArr(v.diagnosisCodes),
            };
          }

          entriesArr.push(entryHosp);
          return null;
        case 'OccupationalHealthcare':
          let entryOcc = <EntryWithoutId>{
            date: parseDate(v.date),
            type: parseType(v.type),
            specialist: parseString(v.specialist),
            employerName: parseString(v.employerName),
            description: parseString(v.description),
          };

          if (v.diagnosisCodes) {
            console.log('diagnosisCodes exists');
            entryOcc = {
              ...entryOcc,
              diagnosisCodes: parseStringArr(v.diagnosisCodes),
            };
          }

          if (v.sickLeave) {
            console.log('sickLeave exists');
            entryOcc = {
              ...entryOcc,
              sickLeave: {
                startDate: parseDate(v.sickLeave.startDate),
                endDate: parseDate(v.sickLeave.endDate),
              }
            };
          }

          entriesArr.push(entryOcc);
          return null;
        case 'HealthCheck':
          let entryHch = <EntryWithoutId>{
            date: parseDate(v.date),
            type: parseType(v.type),
            specialist: parseString(v.specialist),
            description: parseString(v.description),
            healthCheckRating: parseRating(v.healthCheckRating),
          };

          if (v.diagnosisCodes) {
            console.log('diagnosisCodes exists');
            entryHch = {
              ...entryHch,
              diagnosisCodes: parseStringArr(v.diagnosisCodes),
            };
          }

          entriesArr.push(entryHch);
          return null;
        default:
          throw new Error('Invalid type ' + v.type);
      }
    });
    console.log('entries', entriesArr);
    //}
    const newEntry: NewPatient = {
      name: parseString(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseString(obj.occupation),
      entries: entriesArr,
    };

    return newEntry;
  }
  throw new Error('All fields must be filled');
};

export default AcceptedPatientEntry;
