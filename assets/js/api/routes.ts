import each from 'lodash/each';
import replace from 'lodash/replace';
import { API_BASE_PATH } from '../config';

const ROUTES_OBJ = {
  login: `${API_BASE_PATH}/login`,
  getDrivers: `${API_BASE_PATH}/drivers`,
  createDriver: `${API_BASE_PATH}/driver`,
  deleteDriver: `${API_BASE_PATH}/driver/<id>/delete`,
  suspendDriver: `${API_BASE_PATH}/driver/<id>/suspend`,
  getPassengers: `${API_BASE_PATH}/passengers`,
  createPassenger: `${API_BASE_PATH}/passenger`,
};

export type ROUTES = keyof typeof ROUTES_OBJ;
/**
 * getRoute creates the URL through provided routeName & params arguments
 * @param  {string} routeName   any object name of ROUTES_OBJ e.g. login
 * @param  {Object} [params={}] param values replace with strings present <...>.
 * @return {string}             URL
 */
const getRoute = (routeName: ROUTES, params = {}): string => {
  let url: string = ROUTES_OBJ[routeName];
  each(params, (val: string, key: string) => {
    val = Array.isArray(val) ? val.join(',') : val;
    url = replace(url, new RegExp(`<${key}>`, 'g'), val);
  });
  return url;
};

export default getRoute;