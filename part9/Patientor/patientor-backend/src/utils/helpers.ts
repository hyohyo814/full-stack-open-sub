import {
  Gender,
  HealthCheckRating,
  EntryType,
} from '../types';

export const isString = (s: unknown): s is string => {
  return typeof s === 'string' || s instanceof String;
};

export const isNumber = (s: unknown): s is number => {
  return typeof s === 'number' || s instanceof Number;
};

export const isDate = (s: string): boolean => {
  return Boolean(Date.parse(s));
};

export const isType = (s: string): s is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(s);
};

export const isGender = (s: string): s is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(s);
};

export const isRating = (s: number): s is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(s);
};

export const parseString = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Invalid string input: ' + s);
  }
  return s;
};

export const parseType = (s: unknown): EntryType => {
  if (!s || !isString(s) || !isType(s)) {
    throw new Error('Invalid entry type: ' + s);
  }
  return s;
};

export const parseStringArr = (s: unknown) => {
  if (s instanceof Array) {
    const strArr: string[] = [];
    s.forEach(c => {
      return strArr.push(parseString(c));
    });
    return strArr;
  }
  return [];
};

export const parseDate = (s: unknown): string => {
  const regex = new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!isDate || !isString(s) || !s || !regex.test(s)) {
    throw new Error(`Invalid date input: ${s}. Format: YYYY-MM-DD`);
  }
  return s;
};

export const parseSsn = (s: unknown): string => {
  const regex = new RegExp(/^(\d{6})-(\w{3,4})$/);
  if (!s || !isString(s) || !regex.test(s)) {
    throw new Error(
      `Invalid SSN input: ${s}. Format: 6 digits proceeded by 3-4 alphanumerics`
    );
  }
  return s;
};

export const parseGender = (s: unknown): Gender => {
  if (!s || !isString(s) || !isGender(s)) {
    throw new Error(
      `Invalid Gender input: ${s}. Available options: male, female, other`
    );
  }
  return s;
};

export const parseRating = (s: unknown): HealthCheckRating => {
  if (!isNumber(s) || !isRating(s)) {
    throw new Error(`Invalid Rating input: ${s}. Available options: 0-3`);
  }
  return s;
};
