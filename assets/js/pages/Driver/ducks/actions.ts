import { getRequest, postRequest, deleteRequest, setAuthToken } from '../../../api';
import getRoute from '../../../api/routes';
import { getUserToken } from '../../../utils/user';

export const getDrivers = () => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return getRequest(`${getRoute('getDrivers')}`);
};

export const createDriver = (data: {}) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return postRequest(`${getRoute('createDriver')}`, data);
};

export const suspendDriver = (id: number) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return postRequest(`${getRoute('suspendDriver', { id })}`);
};

export const unSuspendDriver = (id: number) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return deleteRequest(`${getRoute('suspendDriver', { id })}`);
};
