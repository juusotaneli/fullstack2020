import patientData from '../../data/patients.json';
import { Patient, PatientsWithoutSSN, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
    return patients;
};
const getPatientsWithoutSSN = (): PatientsWithoutSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
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
    getPatientsWithoutSSN
};