import { FETCH_USER } from './fetch-user-action';
import { USER_FETCHED } from './user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { FETCH_FAILED } from './fetch-failed';
import { USER_AUTHENTICATED } from '../user-authenticated';
import { POST_ACTIONS_FAILED } from '../actions/post-actions-failed';

const isFetchingReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_USER:
    case USER_AUTHENTICATED: {
      return true;
    }
    case USER_FETCHED:
    case FETCH_FAILED:
    case ACTIONS_POSTED:
    case POST_ACTIONS_FAILED: {
      return false;
    }
  }
  return state;
};

export default isFetchingReducer;
