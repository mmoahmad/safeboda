import { intersection } from 'lodash';
import { loadState } from '../store/localstorage';

export function isArrayWithLength(arr: []) {
  return (Array.isArray(arr) && arr.length);
}

export function getAllowedRoutes(routePermissions: []) {
  const state = loadState();
  const permissions = (state && (state.auth.user.permissions || []))
    .map((permission: any) => permission.name);

  return isArrayWithLength(routePermissions)
    ? intersection(routePermissions, permissions).length
    : true;
}
