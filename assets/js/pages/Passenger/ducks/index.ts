import { SET_USERS } from './action-types';

export function setUsers(payload: any) {
  return { type: SET_USERS, payload };
}
