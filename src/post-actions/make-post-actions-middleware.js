import postActions from './post-actions';
import actionsPosted, { ACTIONS_POSTED } from './actions-posted';
import selectIsPostingActions from './select-is-posting-actions';

const makePostActionsMiddleware = ({ selectUser }) => (store) => (next) => {
  const actionsToPost = new Set();
  const postActionsAndDispatch = () => {
    const attemptedPostActions = Array.from(actionsToPost);
    return postActions(attemptedPostActions)
      .then((user) => {
        attemptedPostActions.forEach((postedAction) => {
          actionsToPost.delete(postedAction);
        });
        store.dispatch(actionsPosted({ user }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (action) => {
    if (action.type === ACTIONS_POSTED && actionsToPost.size > 0) {
      postActionsAndDispatch();
      return next(action);
    }
    if (
      !action.meta ||
      typeof action.meta.shouldPost !== 'boolean' ||
      !action.meta.shouldPost
    ) {
      return next(action);
    }
    actionsToPost.push(action);
    const isPostingActions = selectIsPostingActions(
      selectUser(store.getState())
    );
    if (isPostingActions) {
      return next(action);
    }
    postActionsAndDispatch();
    return next(action);
  };
};

export default makePostActionsMiddleware;
