import axios from 'axios';
import getRoute from './routes';
import { AppRoutes } from './routes';

export const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const failedResponse = (error: any) => {
  if (
    error.response &&
    error.response.status &&
    error.response.status === 401 &&
    window.location.pathname !== '/login'
  ) {
    window.location.replace(AppRoutes.LOGOUT.path);
  }
  return Promise.reject(error);
};

export const getRequest = (route: string, params = {}) => {
  if (!route) {
    return;
  }
  return axios
    .get(route, { params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const postRequest = (route: string, data = {}) => {
  return axios
    .post(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const deleteRequest = (route: string, data = {}) => {
  return axios
    .delete(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const putRequest = (route: string, data = {}) => {
  return axios
    .put(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const authenticateUser = (email: string, password: string) => {
  const data = { email, password };
  const route = getRoute('login');
  return postRequest(route, data);
};

