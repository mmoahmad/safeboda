import { getRequest, postRequest, deleteRequest, setAuthToken } from '../../../api';
import getRoute from '../../../api/routes';
import { getUserToken } from '../../../utils/user';

export const getRides = () => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return getRequest(`${getRoute('getRides')}`);
};

export const getDrivers = () => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return getRequest(`${getRoute('getDrivers')}`);
};

export const getPassengers = () => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return getRequest(`${getRoute('getPassengers')}`);
};

export const createRide = (data: {}, driver_id: number, passenger_id: number) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return postRequest(`${getRoute('createRide', {passenger_id, driver_id})}`, data);
};

export const stopRide = (id: number) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return postRequest(`${getRoute('stopRide', { id })}`);
};
