import diagnoses from '../../data/diagnoses';
import { Diagnose, DiagnoseWOLatin } from '../types';

const getData = (): Diagnose[] => {
  return diagnoses;
};

const getDataWOLatin = (): DiagnoseWOLatin[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name
  }));
};

export default {
  getData,
  getDataWOLatin
};