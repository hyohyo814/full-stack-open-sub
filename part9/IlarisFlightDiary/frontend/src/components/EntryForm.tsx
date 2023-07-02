import { useState } from 'react';
import { NewDiaryEntry, Visibility, Weather } from '../types';

const isString = (s: unknown): s is string => {
  return typeof s === 'string' || s instanceof String;
};

const isVisibility = (s: string): s is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(s);
};

const isWeather = (s: string): s is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(s);
};

const parseVisibility = (s: unknown): Visibility => {
  if (!isString(s) || !isVisibility(s)) {
    throw new Error(`Invalid input: visibility ${s}`);
  }
  return s;
};

const parseWeather = (s: unknown): Weather => {
  if (!isString(s) || !isWeather(s)) {
    throw new Error(`Invalid input: weather ${s}`);
  }
  return s;
};

interface Props {
  onSubmit: (values: NewDiaryEntry) => void;
  setErr: (message: string) => void;
}

const EntryForm = ({ onSubmit, setErr }: Props) => {
  const [date, setDate] = useState('');
  const [visibilityStr, setVisibility] = useState('');
  const [weatherStr, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const logEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const visibility = parseVisibility(visibilityStr);
      const weather = parseWeather(weatherStr);
      onSubmit({
        date,
        visibility,
        weather,
        comment,
      });
    } catch (error: unknown) {
      console.log(error);
      let errorMessage = 'An error has occurred.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        setErr(errorMessage);
      }
    }
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <form onSubmit={logEntry}>
        <div>
          <b>date</b>
          <input
            type="date"
            min="2020-01-01"
            max="2023-07-01"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <b>visibility</b>
          great
          <input
            type="radio"
            name="vis"
            value={visibilityStr}
            onChange={() => setVisibility('great')}
          />
          good
          <input
            type="radio"
            name="vis"
            value={visibilityStr}
            onChange={() => setVisibility('good')}
          />
          ok
          <input
            type="radio"
            name="vis"
            value={visibilityStr}
            onChange={() => setVisibility('ok')}
          />
          poor
          <input
            type="radio"
            name="vis"
            value={visibilityStr}
            onChange={() => setVisibility('poor')}
          />
        </div>
        <div>
          <b>weather</b>
          sunny
          <input
            type="radio"
            name="wea"
            value={weatherStr}
            onChange={() => setWeather('sunny')}
          />
          rainy
          <input
            type="radio"
            name="wea"
            value={weatherStr}
            onChange={() => setWeather('rainy')}
          />
          cloudy
          <input
            type="radio"
            name="wea"
            value={weatherStr}
            onChange={() => setWeather('cloudy')}
          />
          stormy
          <input
            type="radio"
            name="wea"
            value={weatherStr}
            onChange={() => setWeather('stormy')}
          />
          windy
          <input
            type="radio"
            name="wea"
            value={weatherStr}
            onChange={() => setWeather('windy')}
          />
        </div>
        <div>
          <b>comment</b>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
