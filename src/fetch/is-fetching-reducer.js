import { FETCH_USER } from './fetch-user-action';
import { USER_FETCHED } from './user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { FETCH_FAILED } from './fetch-failed';

const isFetchingReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return true;
    }
    case USER_FETCHED:
    case FETCH_FAILED:
    case ACTIONS_POSTED: {
      return false;
    }
  }
  return state;
};

export default isFetchingReducer;
