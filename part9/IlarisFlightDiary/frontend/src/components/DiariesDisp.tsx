import { useState } from 'react';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';
import EntryForm from './EntryForm';
import diaryService from '../services/diaryService';
import axios from 'axios';
import './index.css';

interface Props {
  diaries: NonSensitiveDiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const DiariesDisp = ({ diaries, setEntries }: Props) => {
  const [err, setErr] = useState('');
  const logs = diaries.map(({ id, date, weather, visibility }) => {
    return (
      <div key={id}>
        <p>
          <b>{date}</b>
        </p>
        <p>visibility: {visibility}</p>
        <p>weather: {weather}</p>
      </div>
    );
  });

  const logNewEntry = async (values: NewDiaryEntry) => {
    try {
      const log = await diaryService.newEntry(values);
      setEntries(diaries.concat(log));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e.message);
        onError(e.message);
      } else {
        console.log(e);
        onError('unknown error');
      }
    }
  };

  const onError = (message: string) => {
    setErr(message);
    setTimeout(() => {
      setErr('');
    }, 5000);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p className="error">{err}</p>
      <EntryForm
        onSubmit={logNewEntry}
        setErr={onError}
      />
      <h2>Diary logs</h2>
      {logs}
    </div>
  );
};

export default DiariesDisp;
