import express from 'express';
import eCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {

    const w = Number(req.query.weight);
    const h = Number(req.query.height);

    let bmi = '';

    const result = (w / h / h) * 10000;

    if (result < 18.5) {
        bmi = "You should eat more (anorectic)";
    } else if (result >= 18.5 && result <= 25) {
        bmi = "Normal (healthy weight)";
    } else if (result > 25) {
        bmi = "You should eat less (obese)";
    }

    if (!w || !h) {
        res.send({
            error: "malformatted parameters"
        });
    }
    res.send({
        weight: w,
        height: h,
        bmi: bmi
    });
});
app.post('/exercises', (req, res) => {
    if (!req.body.daily_exercises || !req.body.target) {
        res.status(400).json({
            error: "parameters missing"
        });
    } else if (req.body.target < 0 || req.body.daily_exercises.filter((e: number) => Number(e) !== Number(e)).length > 0) {
        res.status(400).json({
            error: "malformatted parameters"
        });

    } else {
        res.json(eCalculator(req.body.target, req.body.daily_exercises));
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});