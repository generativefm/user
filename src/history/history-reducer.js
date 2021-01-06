import { USER_PLAYED_PIECE } from './user-played-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';

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
  }
  return state;
};

export default historyReducer;
