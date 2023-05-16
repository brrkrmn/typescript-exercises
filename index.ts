import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    if (Number.isNaN(height) || Number.isNaN(weight)) {
        res.json({error: 'Height and weight need to be numbers'})
    }
    if (!height || !weight) {
        res.json({error: 'Provide height and weight'})
    } else {
        const bmi = calculateBmi(height, weight)
        res.json({
            height: height, 
            weight: weight,
            bmi: bmi,
        })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});