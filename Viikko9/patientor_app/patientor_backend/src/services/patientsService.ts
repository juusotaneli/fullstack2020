import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
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

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(p => p.id === id);
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