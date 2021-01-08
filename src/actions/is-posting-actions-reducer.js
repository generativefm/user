import { ACTIONS_POSTED } from './actions-posted';
import { POST_ACTIONS_FAILED } from './post-actions-failed';

const isPostingActionsReducer = (state = false, action) => {
  if (action.type === ACTIONS_POSTED || action.type === POST_ACTIONS_FAILED) {
    return false;
  }
  if (!action.meta || typeof action.meta.shouldPost !== 'boolean') {
    return state;
  }
  return state || action.meta.shouldPost;
};

export default isPostingActionsReducer;
