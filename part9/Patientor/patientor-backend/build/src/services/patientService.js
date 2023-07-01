"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patientsData = patients_1.default;
const getData = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const postData = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v4)() }, entry);
    patientsData.push(newPatient);
    return newPatient;
};
exports.default = {
    getData,
    postData
};
