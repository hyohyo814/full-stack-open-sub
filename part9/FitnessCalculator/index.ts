import express from 'express';
import { calculateBmi } from './components/bmiCalculator';
import { calculateExercises } from './components/exerciseCalculator';
import _ from 'lodash';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const height = parseInt(req.query.height as string);
  const weight = parseInt(req.query.weight as string);
  const result = calculateBmi(height, weight);
  res.send(result);
});

app.get('/exercises', (req, res) => {
  if (!req.query.daily_exercises || !req.query.target) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  let parseCheck = false;
  const target = req.query.target as string;
  if (isNaN(parseFloat(target))) {
    parseCheck = true;
  }
  const dailyArr: number[] = [];
  let req1 = req.query.daily_exercises as string;
  req1 = req1.replace('[', '').replace(']', '');
  _.forEach(req1.split(','), (v) => {
    if (!isNaN(parseFloat(v))) {
      dailyArr.push(parseFloat(v));
    } else {
      console.log('string found in array');
      parseCheck = true;
    }
  });

  if (!parseCheck) {
    const result = calculateExercises(dailyArr, parseFloat(target));
    res.send(result);
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
