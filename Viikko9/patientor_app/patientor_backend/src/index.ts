import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import entriesRouter from './routes/entries'

const app = express();
app.use(express.json());

import cors from 'cors';

app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter);

app.use('/api/patients', entriesRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});