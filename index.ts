import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight) {
        res.json({error: 'Provide height and weight'});
    } else if (Number.isNaN(height) || Number.isNaN(weight)) {
        res.json({error: 'Height and weight need to be numbers'});
    } else {
        const bmi = calculateBmi(height, weight);
        res.json({
            height: height, 
            weight: weight,
            bmi: bmi,
        });
    }
});

app.post('/exercises', (req, res) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.exercises || !req.body.target) {
        res.json({error: "Provide exercises and a target."});
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (req.body.exercises.length !== 7) {
        res.json({error: "Provide exercises for 7 days."});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { exercises, target } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercise(exercises, target);
    return res.send({ result });
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});