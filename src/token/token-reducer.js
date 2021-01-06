import { USER_AUTHENTICATED } from '../user-authenticated';
import { TOKEN_CHANGED } from './token-changed';
import { USER_LOGGED_OUT } from '../user-logged-out';

const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
    case TOKEN_CHANGED: {
      return action.payload.token;
    }
    case USER_LOGGED_OUT: {
      return null;
    }
  }
  return state;
};

export default tokenReducer;
