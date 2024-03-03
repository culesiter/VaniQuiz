
import { SET_USER } from '../actions/userActions';

const initialState = {
  user: null // Initial user state
};

const userReducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload // Update user information
      };
    default:
      return state;
  }
};

export default userReducer;