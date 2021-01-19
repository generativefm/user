import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { MERGE_DATA } from '../merge-data';
import { USER_AUTHENTICATED } from '../user-authenticated';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';

const playTimeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      return action.payload.user.playTime || {};
    }
    case USER_LOGGED_OUT: {
      return {};
    }
    case USER_STARTED_ANONYMOUS_SESSION:
    case USER_AUTHENTICATED: {
      if (action.payload.shouldClearData) {
        return {};
      }
      return state;
    }
    case MERGE_DATA: {
      const { playTime = {} } = action.payload;
      return Object.keys(state).reduce((o, pieceId) => {
        o[pieceId] = playTime[pieceId]
          ? playTime[pieceId] + state[pieceId]
          : state[pieceId];
        return o;
      }, Object.assign({}, playTime));
    }
  }
  return state;
};

export default playTimeReducer;
