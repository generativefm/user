import { FETCH_USER } from './fetch-user';
import { USER_FETCHED } from './user-fetched';
import { ACTIONS_POSTED } from '../is-posting-actions/actions-posted';

const isFetchingReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return true;
    }
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      return false;
    }
  }
  return state;
};

export default isFetchingReducer;
