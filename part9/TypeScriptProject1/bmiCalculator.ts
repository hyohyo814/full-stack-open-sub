interface Measurements {
  value1: number;
  value2: number;
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
    throw new Error('Provided values were not numbers')
  }
};

const calculateBmi = (height: number, weight: number) => {
  const heightInM = height / 100;
  const BMI = (weight / (heightInM * heightInM)).toFixed(1);
  const BMIn = Number(BMI);
  console.log(`BMI value: ${BMIn}`);
  switch (true) {
    case BMIn < 16.0:
      return console.log('Underweight (severe)');
    case BMIn >= 16.0 && BMIn <= 16.9:
      return console.log('Underweight (Moderate)');
    case BMIn > 16.9 && BMIn <= 18.4:
      return console.log('Underweight (Mild)');
    case BMIn > 18.4 && BMIn <= 24.9:
      return console.log('Normal (Healthy weight)');
    case BMIn > 24.9 && BMIn <= 29.9:
      return console.log('Overweight (Pre-obses)');
    case BMIn > 29.9 && BMIn <= 34.9:
      return console.log('Obese (Class I)');
    case BMIn > 34.9 && BMIn <= 39.9:
      return console.log('Obese (Class II)');
    case BMIn > 39.9:
      return console.log('Obese (Class III)');
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'An error has occurred.'
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`
  }
  console.log(errorMessage)
  console.log('Arguments: height(cm) && weight(kg)')
}
