interface bmiAttributes {
    value1: number;
    value2: number;
  }
  
  const parseArguments = (args: Array<string>): bmiAttributes => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  const bmiCalculator = (height: number, weight: number) => {
    const result = (weight / height / height) * 10000

    if (result < 18.5) {
        console.log("You should eat more");
    }else if (result >= 18.5 && result <= 25) {
        console.log("Normal (healthy weight)");
    }else if (result > 25) {
        console.log("You should eat less");
    }

    
  }
  
  try {
    const { value1, value2 } = parseArguments(process.argv);
    bmiCalculator(value1, value2);
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }