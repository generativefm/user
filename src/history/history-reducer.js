import { USER_PLAYED_PIECE } from './user-played-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { MERGE_DATA } from '../merge-data';

const historyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      const {
        payload: { pieceId },
        meta: { timestamp },
      } = action;
      return Object.assign({}, state, { [pieceId]: timestamp });
    }
    case USER_LOGGED_OUT: {
      return {};
    }
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      return action.payload.user.history || {};
    }
    case MERGE_DATA: {
      const { history = {} } = action.payload;
      return Object.keys(state).reduce((o, pieceId) => {
        o[pieceId] = history[pieceId]
          ? Math.max(history[pieceId], state[pieceId])
          : state[pieceId];
        return o;
      }, Object.assign({}, history));
    }
  }
  return state;
};

export default historyReducer;
