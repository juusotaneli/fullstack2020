import express from 'express';
import diagnoseRouter from './routes/diagnoses';
const app = express();
app.use(express.json());

import cors from 'cors';

app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});