import { USER_PLAYED_PIECE } from './user-played-piece';
import { USER_LOGGED_OUT } from '../user-logged-out';
import { USER_FETCHED } from '../fetch/user-fetched';
import { ACTIONS_POSTED } from '../actions/actions-posted';
import { MERGE_DATA } from '../merge-data';
import { USER_AUTHENTICATED } from '../user-authenticated';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';
import { UNMERGE_DATA } from '../unmerge-data';
import isPiecePlaybackAction from './is-piece-playback-action';

const historyReducer = (state = {}, action) => {
  if (isPiecePlaybackAction(action)) {
    const {
      timestamp,
      userEvent: {
        data: { pieceId },
      },
    } = action.meta;
    return Object.assign({}, state, { [pieceId]: timestamp });
  }
  switch (action.type) {
    // legacy support for old action
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
    case USER_STARTED_ANONYMOUS_SESSION:
    case USER_AUTHENTICATED: {
      if (action.payload.shouldClearData) {
        return {};
      }
      return state;
    }
    case USER_FETCHED:
    case ACTIONS_POSTED: {
      if (typeof action.payload.user.history !== 'object') {
        return {};
      }
      return Object.assign({}, action.payload.user.history);
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
    case UNMERGE_DATA: {
      const {
        mergedData: { history: mergedHistory },
        previousState: { history: previousHistory },
      } = action.payload;
      return Object.keys(mergedHistory)
        .filter((pieceId) => state[pieceId] === mergedHistory[pieceId])
        .reduce((o, pieceId) => {
          if (!previousHistory[pieceId]) {
            delete o[pieceId];
            return o;
          }
          if (previousHistory[pieceId] < mergedHistory[pieceId]) {
            o[pieceId] = previousHistory[pieceId];
            return o;
          }
          return o;
        }, Object.assign({}, state));
    }
  }
  return state;
};

export default historyReducer;
