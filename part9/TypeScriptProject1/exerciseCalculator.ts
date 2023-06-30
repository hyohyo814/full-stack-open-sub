import * as _ from 'lodash';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Input {
  hours: number[];
  target: number;
}

const parseArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  let stringFound = false
  let argsArr: number[] = []
  const form = args[2].replace("[", "").replace("]", "")
  _.forEach(form.split(","), v => {
    if (!isNaN(Number(v))) {
      argsArr.push(Number(v))
      return
    } else {
      stringFound = true
    }
  })

  if (argsArr instanceof Array && !stringFound && !isNaN(Number(args[3]))) {
    return {
      hours: argsArr,
      target: Number(args[3])
    }
  }
}

const calculateExercises = (hours: number[], target: number): Result => {
  let periodLength: number = 0;
  let trainingDays: number = 0;
  let rating: number = 0;
  let ratingDescription: string = '';
  let success: boolean = false;
  _.forEach(hours, (v) => {
    periodLength += 1;
    if (v !== 0) {
      trainingDays += 1;
    }
  });
  const avgCalc = _.mean(hours).toFixed(1);
  const average: number = Number(avgCalc);
  const compare = average / target;

  let result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  switch (true) {
    case compare < 0.5:
      result = {
        ...result,
        success: false,
        rating: 1,
        ratingDescription: 'much more work needed to be done'
      }
      console.log(result);
      return result;
    case compare > 0.5 && compare < 1:
      result = {
        ...result,
        success: false,
        rating: 2,
        ratingDescription: 'not too bad but could be better',
      }
      console.log(result);
      return result;
    case compare >= 1:
      result = {
        ...result,
        success: true,
        rating: 3,
        ratingDescription: 'great work! target reached'
      }
      console.log(result);
      return result;
  }
};

try {
  const { hours, target } = parseArguments(process.argv)
  calculateExercises(hours, target)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}
