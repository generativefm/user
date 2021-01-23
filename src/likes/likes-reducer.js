import { USER_LIKED_PIECE } from './user-liked-piece';
import { USER_UNLIKED_PIECE } from './user-unliked-piece';
import { USER_DISLIKED_PIECE } from '../dislikes/user-disliked-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { MERGE_DATA } from '../merge-data';
import { USER_AUTHENTICATED } from '../user-authenticated';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';
import { UNMERGE_DATA } from '../unmerge-data';

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
    case USER_STARTED_ANONYMOUS_SESSION:
    case USER_AUTHENTICATED: {
      if (action.payload.shouldClearData) {
        return {};
      }
      return state;
    }
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      return action.payload.user.likes || {};
    }
    case MERGE_DATA: {
      const { likes = {}, dislikes = {} } = action.payload;
      return Object.keys(state)
        .filter(
          (pieceId) => !dislikes[pieceId] || dislikes[pieceId] <= state[pieceId]
        )
        .reduce((o, pieceId) => {
          o[pieceId] = likes[pieceId]
            ? Math.max(likes[pieceId], state[pieceId])
            : state[pieceId];
          return o;
        }, Object.assign({}, likes));
    }
    case UNMERGE_DATA: {
      const {
        mergedData: { likes: mergedLikes = {}, dislikes: mergedDislikes = {} },
        previousState: { likes: previousLikes = {} },
      } = action.payload;
      const {
        currentState: { dislikes: currentDislikes = {} },
      } = action.meta;
      const newState = Object.keys(mergedLikes)
        .filter((pieceId) => state[pieceId] === mergedLikes[pieceId])
        .reduce((o, pieceId) => {
          if (!previousLikes[pieceId]) {
            delete o[pieceId];
            return o;
          }
          if (previousLikes[pieceId] < mergedLikes[pieceId]) {
            o[pieceId] = previousLikes[pieceId];
            return o;
          }
          return o;
        }, Object.assign({}, state));
      return Object.keys(mergedDislikes)
        .filter(
          (pieceId) =>
            currentDislikes[pieceId] === mergedDislikes[pieceId] &&
            previousLikes[pieceId]
        )
        .reduce((o, pieceId) => {
          o[pieceId] = previousLikes[pieceId];
          return o;
        }, newState);
    }
  }
  return state;
};

export default likesReducer;
