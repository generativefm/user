import { USER_AUTHENTICATED } from '../user-authenticated';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';

const userIdReducer = (state = null, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED: {
      return action.payload.userId;
    }
    case USER_STARTED_ANONYMOUS_SESSION:
    case USER_LOGGED_OUT: {
      return null;
    }
  }
  return state;
};

export default userIdReducer;
