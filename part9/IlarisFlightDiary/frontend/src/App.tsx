import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from './contestants';

import { NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaryService';

import DiariesDisp from './components/DiariesDisp';

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${baseUrl}/ping`);

    const initialize = async () => {
      const data = await diaryService.getAll();
      setEntries(data);
    };

    void initialize();
  }, []);

  return (
    <div>
      <DiariesDisp
        diaries={entries}
        setEntries={setEntries}
      />
    </div>
  );
};

export default App;
