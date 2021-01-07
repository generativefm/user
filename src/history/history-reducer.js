import { USER_PLAYED_PIECE } from './user-played-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../post-actions/actions-posted';

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
      return action.payload.user.history;
    }
  }
  return state;
};

export default historyReducer;
