"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const patientDataParser_1 = __importDefault(require("../utils/patientDataParser"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getData());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, patientDataParser_1.default)(req.body);
        console.log(newPatient);
        const appendedEntry = patientService_1.default.postData(newPatient);
        console.log(appendedEntry);
        res.status(201).json(appendedEntry);
    }
    catch (error) {
        let errorMessage = 'An error has occurred.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
