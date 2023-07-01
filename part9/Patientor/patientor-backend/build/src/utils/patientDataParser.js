"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (s) => {
    return typeof s === 'string' || s instanceof String;
};
const isDate = (s) => {
    return Boolean(Date.parse(s));
};
const isGender = (s) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(s);
};
const parseString = (s) => {
    if (!s || !isString(s)) {
        throw new Error('Invalid string input: ' + s);
    }
    return s;
};
const parseDate = (s) => {
    const regex = new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!isDate || !isString(s) || !s || !regex.test(s)) {
        throw new Error(`Invalid date input: ${s}. Format: YYYY-MM-DD`);
    }
    return s;
};
const parseSsn = (s) => {
    const regex = new RegExp(/^(\d{6})-(\w{3,4})$/);
    if (!s || !isString(s) || !regex.test(s)) {
        throw new Error(`Invalid SSN input: ${s}. Format: 6 digits proceeded by 3-4 alphanumerics`);
    }
    return s;
};
const parseGender = (s) => {
    if (!s || !isString(s) || !isGender(s)) {
        throw new Error(`Invalid Gender input: ${s}. Available options: male, female, other`);
    }
    return s;
};
const AcceptedPatientEntry = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Invalid or missing input query');
    }
    if ('name' in obj &&
        'dateOfBirth' in obj &&
        'ssn' in obj &&
        'gender' in obj &&
        'occupation' in obj) {
        const newEntry = {
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
exports.default = AcceptedPatientEntry;
