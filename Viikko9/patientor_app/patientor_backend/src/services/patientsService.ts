import patientData from '../../data/patients.json';
import { Patient, PublicPatient, NewPatientEntry } from '../types';

const patients: Array<PublicPatient> = patientData;

const patients1: Array<PublicPatient> = patientData;

const getEntries = (): Array<PublicPatient> => {
    return patients;
};
const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const findById = (id: string): PublicPatient | undefined => {
    const entry = patients1.find(p => p.id === id);
    return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: Math.random().toString(36).substring(7),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient,
    getPublicPatients,
    findById
};