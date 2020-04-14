interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface UserFeed {
    target: number;
    exercises: Array<number>;
}

type Rating = "bad" | "average" | "good"

const parser = (args: Array<string>): UserFeed => {
    console.log(args)
    let [, , thirdArgument, ...exercises] = args;
    if (exercises.length <= 0) throw new Error('No exercises given');

    return {
        target: Number(thirdArgument),
        exercises: exercises.map(e => Number(e))
    }
}

const exerciseCalculator = (target: number, exercises: Array<number>): Result => {

    let totalHours = 0;
    let trainingDays = 0;
    let success = false;
    let rating = 0;
    let ratingDescription = '';

    let averagePerDay = 0;

    exercises.map(e => totalHours += e);

    averagePerDay = totalHours / exercises.length;

    if (averagePerDay > target) {
        success = true;
    }
    if (averagePerDay < target - 0.5) {
        rating = 1;
        ratingDescription = 'bad'

    } else if (averagePerDay >= target - 0.5 && averagePerDay <= target + 0.5) {
        rating = 2;
        ratingDescription = 'average'

    } else if (averagePerDay > target + 0.5) {
        rating = 3;
        ratingDescription = 'good'
    }

    return {
        periodLength: exercises.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averagePerDay

    }

}

try {
    const { target, exercises } = parser(process.argv);
    console.log(exerciseCalculator(target, exercises))

} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);

}