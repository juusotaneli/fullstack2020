import { Entry, EntryTypes, Discharge, SickLeave, HealthCheckRating } from './types';
import diagnoseData from '../data/diagnoses.json';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isEntryType = (param: any): param is Entry => {
    return Object.values(EntryTypes).includes(param.type);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param.type);
};

const parseEntry = (e: any): Entry => {
    if (!isEntryType(e)) {
        throw new Error('Incorrect or missing type: ' + e.type);
    }
    return e;
};
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (s: any): string => {
    if (!s || !isString(s)) {
        throw new Error('One string field contains incorrect type or is missing value: ' + s);
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
const parseDischarge = (d: any): Discharge => {
    if (!isDate(d.date) || !isString(d.criteria)) {
        throw new Error('Incorrect or missing discharge info');
    }
    return d;
};
const parseSickLeave = (s: any): SickLeave => {
    if (!isDate(s.startDate) || !isDate(s.endDate)) {
        throw new Error('Incorrect or missing dates');
    }
    return s;
};
const parseHealthCheckRating = (h: any): HealthCheckRating => {
    if (!isHealthCheckRating(h)) {
        throw new Error('Incorrect healthcheck rating value');
    }
    return h;

};
const parseDiagnoseCodes = (codes: any): string[] => {
    if (codes.length === 0) {
        return [];
    }
    console.log(diagnoseData.filter(d => String(d.code) === String(codes[0])));
    codes.map((c: { code: any }) => {
        if (diagnoseData.filter(d => String(d.code) === String(c)).length === 0) {
            console.log();
            throw new Error('Incorrect diagnose code(s)');
        }

    });
    return codes;

};
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
const toNewEntry = (e: any): Entry => {
    const entry = parseEntry(e);

    switch (entry.type) {
        case ("Hospital"):
            return {
                id: e.id,
                description: parseString(e.description),
                date: parseDate(e.date),
                specialist: parseString(e.specialist),
                diagnosisCodes: parseDiagnoseCodes(e.diagnosisCodes),
                type: e.type,
                discharge: parseDischarge(e.discharge)
            };
        case ("OccupationalHealthcare"):
            return {
                id: parseString(e.id),
                description: parseString(e.description),
                date: parseDate(e.date),
                specialist: parseString(e.specialist),
                diagnosisCodes: parseDiagnoseCodes(e.diagnosisCodes),
                type: e.type,
                employerName: parseString(e.employerName),
                sickLeave: parseSickLeave(e.sickLeave)
            };
        case ("HealthCheck"):
            return {
                id: parseString(e.id),
                description: parseString(e.description),
                date: parseDate(e.date),
                specialist: parseString(e.specialist),
                diagnosisCodes: parseDiagnoseCodes(e.diagnosisCodes),
                type: e.type,
                healthCheckRating: parseHealthCheckRating(e.healthCheckRating)
            };
        default:
            return assertNever(entry);
    }
};
export default toNewEntry;