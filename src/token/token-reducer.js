import { USER_AUTHENTICATED } from '../user-authenticated';
import { TOKEN_CHANGED } from './token-changed';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
    case TOKEN_CHANGED: {
      return action.payload.token;
    }
    case USER_STARTED_ANONYMOUS_SESSION:
    case USER_LOGGED_OUT: {
      return null;
    }
  }
  return state;
};

export default tokenReducer;
