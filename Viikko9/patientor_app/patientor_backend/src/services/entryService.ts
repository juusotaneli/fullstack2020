import patientData from '../../data/patients';
import { Patient, Entry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
    return patients;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addEntry = (entry: Entry, id: string): Patient | undefined => {
    const p = findById(id);
    p?.entries?.push(entry);
    return p;

};
export default {
    getEntries,
    addEntry,
    findById
};