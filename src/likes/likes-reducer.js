import { USER_LIKED_PIECE } from './user-liked-piece';
import { USER_UNLIKED_PIECE } from './user-unliked-piece';
import { USER_DISLIKED_PIECE } from '../dislikes/user-disliked-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';

const likesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIKED_PIECE: {
      const {
        payload: { pieceId },
        meta: { timestamp },
      } = action;
      return Object.assign({}, state, { [pieceId]: timestamp });
    }
    case USER_UNLIKED_PIECE:
    case USER_DISLIKED_PIECE: {
      const {
        payload: { pieceId },
        meta: { timestamp },
      } = action;
      if (!state[pieceId] || state[pieceId] > timestamp) {
        return state;
      }
      return Object.keys(state).reduce((o, likedPieceId) => {
        if (likedPieceId !== pieceId || timestamp < state[likedPieceId]) {
          o[likedPieceId] = state[likedPieceId];
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

export default likesReducer;
