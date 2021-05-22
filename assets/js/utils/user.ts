import Cookies from 'universal-cookie';
import { COOKIE_USER_TOKEN_FIELD } from '../config';

export function setUserToken(payload: any) {
  const cookies = new Cookies();
  cookies.set(COOKIE_USER_TOKEN_FIELD, payload.data.jwt, { path: '/' });
}

export function getUserToken() {
  const cookies = new Cookies();
  return cookies.get(COOKIE_USER_TOKEN_FIELD);
}

export function deleteUserToken() {
  const cookies = new Cookies();
  cookies.remove(COOKIE_USER_TOKEN_FIELD);
}

export function isLoggedIn() {
  return !!(getUserToken() !== undefined || '' || null);
}
