import { USER_DISLIKED_PIECE } from './user-disliked-piece';
import { USER_UNDISLIKED_PIECE } from './user-undisliked-piece';
import { USER_LIKED_PIECE } from '../likes/user-liked-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { MERGE_DATA } from '../merge-data';
import { USER_AUTHENTICATED } from '../user-authenticated';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';
import { UNMERGE_DATA } from '../unmerge-data';

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
    case USER_STARTED_ANONYMOUS_SESSION:
    case USER_AUTHENTICATED: {
      if (action.payload.shouldClearData) {
        return {};
      }
      return state;
    }
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      return action.payload.user.dislikes || {};
    }
    case MERGE_DATA: {
      const { likes = {}, dislikes = {} } = action.payload;
      return Object.keys(state)
        .filter((pieceId) => !likes[pieceId] || likes[pieceId] < state[pieceId])
        .reduce((o, pieceId) => {
          o[pieceId] = dislikes[pieceId]
            ? Math.max(dislikes[pieceId], state[pieceId])
            : state[pieceId];
          return o;
        }, Object.assign({}, dislikes));
    }
    case UNMERGE_DATA: {
      const {
        mergedData: { dislikes: mergedDislikes = {}, likes: mergedLikes = {} },
        previousState: { dislikes: previousDislikes = {} },
      } = action.payload;
      const {
        currentState: { likes: currentLikes = {} },
      } = action.meta;
      const newState = Object.keys(mergedDislikes)
        .filter((pieceId) => state[pieceId] === mergedDislikes[pieceId])
        .reduce((o, pieceId) => {
          if (!previousDislikes[pieceId]) {
            delete o[pieceId];
            return o;
          }
          if (previousDislikes[pieceId] < mergedDislikes[pieceId]) {
            o[pieceId] = previousDislikes[pieceId];
            return o;
          }
          return o;
        }, Object.assign({}, state));
      return Object.keys(mergedLikes)
        .filter(
          (pieceId) =>
            currentLikes[pieceId] === mergedLikes[pieceId] &&
            previousDislikes[pieceId]
        )
        .reduce((o, pieceId) => {
          o[pieceId] = previousDislikes[pieceId];
          return o;
        }, newState);
    }
  }
  return state;
};

export default dislikesReducer;
