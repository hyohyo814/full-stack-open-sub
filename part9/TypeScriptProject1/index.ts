import express from 'express';
// import { Measurements, calculateBmi, bmiCalculator } from './components/bmiCalculator';
import { calculateBmi } from './components/bmiCalculator';
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
