import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { USER_LOGGED_OUT } from '../user-logged-out';

const playTimeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      return action.payload.user.playTime;
    }
    case USER_LOGGED_OUT: {
      return {};
    }
  }
  return state;
};

export default playTimeReducer;
