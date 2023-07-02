import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
import { baseUrl } from '../contestants';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`);
  return data;
};

const newEntry = async (obj: NewDiaryEntry) => {
  const { data } = await axios.post<NonSensitiveDiaryEntry>(
    `${baseUrl}/api/diaries`,
    obj
  );
  return data;
};

export default {
  getAll,
  newEntry,
};
