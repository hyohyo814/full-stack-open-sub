export interface Measurements {
  value1: number;
  value2: number;
}

export interface Results {
  height: number;
  weight: number;
  category: string;
}

const parseArguments = (args: string[]): Measurements => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): Results => {
  const heightInM = height / 100;
  const BMI = (weight / (heightInM * heightInM)).toFixed(1);
  const BMIn = Number(BMI);
  console.log(`BMI value: ${BMIn}`);
  switch (true) {
    case BMIn < 16.0:
      console.log('Underweight (severe)');
      return { height, weight, category: 'Underweight (severe)' };
    case BMIn >= 16.0 && BMIn <= 16.9:
      console.log('Underweight (Moderate)');
      return { height, weight, category: 'Underweight (Moderate)' };
    case BMIn > 16.9 && BMIn <= 18.4:
      console.log('Underweight (Mild)');
      return { height, weight, category: 'Underweight (Mild)' };
    case BMIn > 18.4 && BMIn <= 24.9:
      console.log('Normal (Healthy weight)');
      return { height, weight, category: 'Normal (Healthy weight)' };
    case BMIn > 24.9 && BMIn <= 29.9:
      console.log('Overweight (Pre-obses)');
      return { height, weight, category: 'Overweight (Pre-obses)' };
    case BMIn > 29.9 && BMIn <= 34.9:
      console.log('Obese (Class I)');
      return { height, weight, category: 'Obese (Class I)' };
    case BMIn > 34.9 && BMIn <= 39.9:
      console.log('Obese (Class II)');
      return { height, weight, category: 'Obese (Class II)' };
    case BMIn > 39.9:
      console.log('Obese (Class III)');
      return { height, weight, category: 'Obese (Class III)' };
    default:
      throw new Error('malformatted parameters');
  }
};

export const bmiCalculator = () => {
  try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBmi(value1, value2);
  } catch (error: unknown) {
    let errorMessage = 'An error has occurred.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
    console.log('Arguments: height(cm) && weight(kg)');
  }
};
