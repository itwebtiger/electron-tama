import {
  CREATE_MEDICATION_REQUEST,
  CREATE_MEDICATION_SUCCESS,
  CREATE_MEDICATION_FAILED,
  CREATE_DISPENSE_REQUEST,
  CREATE_DISPENSE_SUCCESS,
  CREATE_DISPENSE_FAILED,
  FETCH_MEDICATIONS_REQUEST,
  FETCH_MEDICATIONS_SUCCESS,
  FETCH_MEDICATIONS_FAILED,
} from './types';
import { idGenerator } from '../constants';

export function createMedicationRequest() {
  return {
    type: CREATE_MEDICATION_REQUEST
  };
}

export function createMedicationSuccess(medication) {
  return {
    type: CREATE_MEDICATION_SUCCESS,
    payload: medication
  };
}

export function createMedicationFailed() {
  return {
    type: CREATE_MEDICATION_FAILED
  };
}

export function createDispenseRequest() {
  return {
    type: CREATE_DISPENSE_REQUEST
  };
}

export function createDispenseSuccess(dispense) {
  return {
    type: CREATE_DISPENSE_SUCCESS,
    payload: dispense
  };
}

export function createDispenseFailed() {
  return {
    type: CREATE_DISPENSE_FAILED
  };
}

export function fetchMedicationsRequest() {
  return {
    type: FETCH_MEDICATIONS_REQUEST
  };
}

export function fetchMedicationsSuccess(medications) {
  return {
    type: FETCH_MEDICATIONS_SUCCESS,
    payload: medications
  };
}

export function fetchMedicationsFailed() {
  return {
    type: FETCH_MEDICATIONS_FAILED
  };
}

export const createMedication = medication => {
  return dispatch => {
    dispatch(createMedicationRequest());
    const existingMedications = JSON.parse(localStorage.getItem('medications')) || [];
    const medicationInfo = medication;
    medicationInfo.id = idGenerator();
    existingMedications.push(medicationInfo);
    localStorage.setItem('medications', JSON.stringify(existingMedications));
  };
};

export const createDispense = dispense => {
  return dispatch => {
    dispatch(createMedicationRequest());
    const existingDispenses = JSON.parse(localStorage.getItem('dispense')) || [];
    const dispenseInfo = dispense;
    dispenseInfo.id = idGenerator();
    existingDispenses.push(dispenseInfo);
    localStorage.setItem('dispense', JSON.stringify(existingDispenses));
  };
};

export const fetchMedications = () => {
  return dispatch => {
    dispatch(fetchMedicationsRequest());
    const existingMedications = JSON.parse(localStorage.getItem('medications')) || [];
    dispatch(fetchMedicationsSuccess(existingMedications));
  };
};
