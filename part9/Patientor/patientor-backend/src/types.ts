export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type DiagnoseWOLatin = Omit<Diagnose, 'latin'>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType;
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType;
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

type ChangeFields<T, K> = Omit<T, keyof K> & K;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientNoEntries = Omit<Patient, 'entries'>;

export type NewPatient = Omit<ChangeFields<Patient, {entries: EntryWithoutId[]}>, 'id'>;

export type PatientNonSensitive = Omit<Patient, 'ssn'>;
