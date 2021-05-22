import { AUTH_USER, SIGNOUT, UPDATE_USER } from 'pages/Auth/ducks/action-types';

const initialState = { user: {} };

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case AUTH_USER:
      state = {
        ...state,
        user: action.payload.data.user,
      };
      break;
    case UPDATE_USER:
      state = {
        ...state,
        user: action.payload.data,
      };
      break;
    case SIGNOUT:
      state = initialState;
      break;
    default:
  }
  return state;
}

export default reducer;
