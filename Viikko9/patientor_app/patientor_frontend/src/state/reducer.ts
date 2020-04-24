import { State } from "./state";
import { Patient, Diagnose } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "GET_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  }
  | {
    type: "GET_DIAGNOSES";
    payload: Diagnose[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log(state.patient);
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patient: action.payload

      };
    case "GET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patient: action.payload

      };
    default:
      return state;
  }
};
export const getAllPatients = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data
  };
};
export const addPatient = (data: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: data
  };
};
export const addEntry = (data: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: data
  };
};
export const getPatient = (data: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: data
  };
};
export const getDiagnoses = (data: Diagnose[]): Action => {
  return {
    type: "GET_DIAGNOSES",
    payload: data
  };
};
