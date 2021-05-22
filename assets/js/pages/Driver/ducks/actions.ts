import { getRequest, postRequest, putRequest, setAuthToken } from '../../../api';
import getRoute from '../../../api/routes';
import { getUserToken } from '../../../utils/user';

export const getDrivers = () => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return getRequest(`${getRoute('getDrivers')}`);
};

export const deleteDriver = (id: number) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return getRequest(`${getRoute('deleteDriver', { id })}`);
};

export const createDriver = (data: {}) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return postRequest(`${getRoute('createDriver')}`, data);
};
