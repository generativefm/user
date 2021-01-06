import { USER_DISLIKED_PIECE } from './user-disliked-piece';
import { USER_UNDISLIKED_PIECE } from './user-undisliked-piece';
import { USER_LIKED_PIECE } from '../likes/user-liked-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';

const dislikesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DISLIKED_PIECE: {
      const {
        payload: { pieceId },
        meta: { timestamp },
      } = action;
      return Object.assign({}, state, { [pieceId]: timestamp });
    }
    case USER_UNDISLIKED_PIECE:
    case USER_LIKED_PIECE: {
      const {
        payload: { pieceId },
        meta: { timestamp },
      } = action;
      if (!state[pieceId] || state[pieceId] > timestamp) {
        return state;
      }
      return Object.keys(state).reduce((o, dislikedPieceId) => {
        if (dislikedPieceId !== pieceId || timestamp < state[dislikedPieceId]) {
          o[dislikedPieceId] = state[dislikedPieceId];
        }
        return o;
      }, {});
    }
    case USER_LOGGED_OUT: {
      return {};
    }
  }
  return state;
};

export default dislikesReducer;
