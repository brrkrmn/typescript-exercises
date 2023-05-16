interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values are not numbers!');
    }
}

export const calculateBmi = (h: number, w: number) => {
    const bmi: number = (w / h / h) * 10000
    if (bmi < 18.5) {
        return('underweight')
    } else if ( bmi < 24.9 ) {
        return('normal')
    } else if (bmi < 29.9) {
        return('overweight')
    } else {
        return('obese')
    }
}

try {
    const { height, weight } = parseArguments(process.argv)
    calculateBmi(height, weight)
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage)
}