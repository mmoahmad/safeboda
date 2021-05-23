import { AUTH_USER, SIGNOUT } from './action-types';
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