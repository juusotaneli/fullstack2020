import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {

    let w = Number(req.query.weight);
    let h = Number(req.query.height);

    let bmi = '';

    let result = (w / h / h) * 10000

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
        })
    }
    res.send({
        weight: w,
        height: h,
        bmi: bmi
    });
});



const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});