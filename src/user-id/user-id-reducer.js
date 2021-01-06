import { USER_AUTHENTICATED } from '../user-authenticated';
import { USER_LOGGED_OUT } from '../user-logged-out';

const userIdReducer = (state = null, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED: {
      return action.payload.userId;
    }
    case USER_LOGGED_OUT: {
      return null;
    }
  }
  return state;
};

export default userIdReducer;
