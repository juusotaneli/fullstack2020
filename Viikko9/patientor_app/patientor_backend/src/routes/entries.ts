import entryService from "../services/entryService";
import express from 'express';
import toNewEntry from '../entryUtils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        console.log(req.body);
        const modifiedPatient = entryService.addEntry(newEntry, req.params.id);
        res.json(modifiedPatient);

    } catch (e) {
        res.status(401).send(e.message);
    }
});
export default router;


