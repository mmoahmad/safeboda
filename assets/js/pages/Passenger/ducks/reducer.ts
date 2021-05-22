import { SET_USERS } from './action-types';

const initialState = {
  users: {},
};

function usersReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USERS:
      state = { ...state, users: action.users };
      break;
    default:
  }
  return state;
}

export default usersReducer;
