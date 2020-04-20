import express from 'express';
import patientService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPublicPatients());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);

    } catch (e) {
        res.status(400).send(e.message);
    }

});
router.get('/:id', (req, res) => {

    const p = patientService.findById(req.params.id);
    if (p) {
        res.send(p);
    } else {
        res.sendStatus(404);
    }
});
export default router;