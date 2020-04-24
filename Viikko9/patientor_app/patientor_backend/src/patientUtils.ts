/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, Entry, EntryTypes } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (s: any): string => {
    if (!s || !isString(s)) {
        throw new Error('Incorrect or missing comment: ' + s);
    }
    return s;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isEntryType = (param: any): param is Entry => {
    return Object.values(EntryTypes).includes(param.type);
};
const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
        return [];
    }
    entries.forEach((e: any) => {
        if (!isEntryType(e)) {
            throw new Error('Incorrect or missing type: ' + e);
        }
    });
    return entries;
};

const toNewPatient = (object: any): NewPatientEntry => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: parseEntries(object.entries)
    };
};
export default toNewPatient;