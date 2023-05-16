interface exerciseResults {
    peirodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExercises = (args: string[]): number[] => {
    if (args.length !== 9) throw new Error('Please provide 7 days');
    const exercises: number[] = [];
    args.slice(2).map(day => {
        if(!isNaN(Number(day))) {
            exercises.push(Number(day));
        } else {
            throw new Error('Please provide exercise hours as numbers.');
        }
    });
    return exercises;
};

export const calculateExercise = (exercises: number[], target: number): exerciseResults => {
    const totalExercisedDays: number = exercises.filter(day => day !== 0).length;
    const totalExercisedHours: number = exercises.reduce((sum, day) => sum + day, 0);
    const success = totalExercisedDays >= target;
    const average = totalExercisedHours/7;
    
    let rating = 0;
    let ratingDescription = '';
    if(average < 1) {
        rating = 1;
        ratingDescription = 'Work harder!';
    } else if (average < 2) {
        rating = 2;
        ratingDescription = 'Keep Going!';
    } else {
        rating = 3;
        ratingDescription = 'Great Result!';
    }

    const results: exerciseResults = {
        peirodLength: exercises.length,
        trainingDays: totalExercisedDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
    
    return(results);
};

try {
    const exercises = parseExercises(process.argv);
    console.log(calculateExercise(exercises, 3));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}