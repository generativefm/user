import { ACTIONS_POSTED } from './actions-posted';

const isPostingActionsReducer = (state = false, action) => {
  if (action.type === ACTIONS_POSTED) {
    return false;
  }
  if (!action.meta || typeof action.meta.shouldPost !== 'boolean') {
    return state;
  }
  return state || action.meta.shouldPost;
};

export default isPostingActionsReducer;
