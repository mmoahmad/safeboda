import { AUTH_USER, SIGNOUT, UPDATE_USER } from './action-types';
import { setUserToken } from '../../../utils/user';
import {
  authenticateUser,
  registerUser,
  updatePassword,
  updateProfile
} from '../../../api';

export function setAuthUser(payload: any) {
  return { type: AUTH_USER, payload };
}

export function setProfileUpdate(payload: any) {
  return { type: UPDATE_USER, payload };
}

export function deleteUserInfo() {
  return { type: SIGNOUT };
}

export const authenticateUserAction = (email: string, password: string) => (
  dispatch: any
) => {
  return authenticateUser(email, password)
    .then((resp) => {
      if (resp) {
        dispatch(setAuthUser(resp));
        setUserToken(resp);
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const registerUserAction = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => (dispatch: any) => {
  return registerUser(email, password, firstName, lastName)
    .then((resp) => {
      if (resp) {
        dispatch(setAuthUser(resp));
        setUserToken(resp);
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const updateProfileAction = (
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  image: string
) => (dispatch: any, getState: any) => {
  return updateProfile(email, username, first_name, last_name, image)
    .then((resp) => {
      if (resp) {
        dispatch(setProfileUpdate(resp));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const updatePasswordAction = (
  oldPassword: string,
  newPassword: string
) => (dispatch: any, getState: any) => {
  return updatePassword(oldPassword, newPassword)
    .then((resp) => {
      if (resp) {
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};
