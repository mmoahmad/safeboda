import { getRequest, postRequest, putRequest, setAuthToken } from '../../../api';
import getRoute from '../../../api/routes';
import { getUserToken } from '../../../utils/user';

export const getPassengers = () => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return getRequest(`${getRoute('getPassengers')}`);
};

export const createPassenger = (data: {}) => async (dispatch: any, getState: any) => {
  setAuthToken(getUserToken());
  return postRequest(`${getRoute('createPassenger')}`, data);
};
