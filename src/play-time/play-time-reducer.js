import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { MERGE_DATA } from '../merge-data';

const playTimeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      return action.payload.user.playTime || {};
    }
    case USER_LOGGED_OUT: {
      return {};
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
