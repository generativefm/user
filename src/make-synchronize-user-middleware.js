import { FETCH_USER } from './fetch/fetch-user-action';
import fetchUser from './fetch/fetch-user';
import userFetched from './fetch/user-fetched';
import fetchFailed from './fetch/fetch-failed';
import selectIsPostingActions from './actions/select-is-posting-actions';
import postActions from './actions/post-actions';
import postActionsFailed from './actions/post-actions-failed';
import actionsPosted, { ACTIONS_POSTED } from './actions/actions-posted';
import selectUserId from './user-id/select-user-id';
import selectToken from './token/select-token';
import { USER_LOGGED_OUT } from './user-logged-out';
import IS_STORAGE_SUPPORTED from './storage/is-supported';
import getStoredActions from './actions/get-stored-actions';
import storeAction from './actions/store-action';
import deleteStoredActions from './actions/delete-stored-actions';
import clearData from './storage/clear-data';

const makeSynchronizeUserMiddleware = ({ selectUser }) => (store) => (next) => {
  const actionsToPost = new Set();
  const isReady = IS_STORAGE_SUPPORTED
    ? getStoredActions().then((actions) => {
        actions.forEach((storedAction) => actionsToPost.add(storedAction));
      })
    : Promise.resolve();
  let hasChanged = false;
  const postActionsAndDispatch = ({ userState, token }) => {
    const attemptedPostActions = Array.from(actionsToPost);
    const { userId } = selectUserId(userState);
    return isReady.then(() =>
      postActions({ actions: attemptedPostActions, userId, token })
        .then(({ user }) => {
          if (user === null) {
            store.dispatch(postActionsFailed());
            return;
          }
          attemptedPostActions.forEach((postedAction) => {
            actionsToPost.delete(postedAction);
          });
          if (IS_STORAGE_SUPPORTED) {
            deleteStoredActions(attemptedPostActions).then(() =>
              store.dispatch(actionsPosted({ user }))
            );
          } else {
            store.dispatch(actionsPosted({ user }));
          }
        })
        .catch((err) => {
          console.error(err);
          store.dispatch(postActionsFailed());
        })
    );
  };
  const postActionsIfNotPosting = ({ userState, token }) => {
    const isPostingActions = selectIsPostingActions(userState);
    if (!isPostingActions) {
      postActionsAndDispatch({ userState, token });
    }
  };
  return (action) => {
    const state = store.getState();
    const userState = selectUser(state);
    const token = selectToken(userState);
    if (!token) {
      return next(action);
    }
    if (action.type === USER_LOGGED_OUT) {
      actionsToPost.clear();
      clearData();
      return next(action);
    }
    if (action.type === ACTIONS_POSTED && actionsToPost.size > 0) {
      postActionsAndDispatch({ userState, token });
      return next(action);
    }
    if (action.type === FETCH_USER) {
      if (actionsToPost.size > 0) {
        postActionsIfNotPosting({ userState, token });
      } else {
        const { userId } = selectUserId(userState);
        isReady.then(() =>
          fetchUser({ userId, token })
            .then(({ user, isFresh }) => {
              const currentState = store.getState();
              const currentUserState = selectUser(currentState);
              const isPostingActions = selectIsPostingActions(currentUserState);
              if (isPostingActions) {
                // if a post was started before the fetch completed,
                // just wait for that post to complete
                return;
              }
              if ((isFresh || !hasChanged) && user !== null) {
                store.dispatch(userFetched({ user }));
              } else {
                store.dispatch(fetchFailed());
              }
            })
            .catch((err) => {
              console.error(err);
              store.dispatch(fetchFailed());
            })
        );
      }
      return next(action);
    }
    if (
      !action.meta ||
      typeof action.meta.shouldPost !== 'boolean' ||
      !action.meta.shouldPost
    ) {
      return next(action);
    }
    hasChanged = true;
    actionsToPost.push(action);
    if (IS_STORAGE_SUPPORTED) {
      storeAction(action).then(() =>
        postActionsIfNotPosting({ userState, token })
      );
    } else {
      postActionsIfNotPosting({ userState, token });
    }
    return next(action);
  };
};

export default makeSynchronizeUserMiddleware;
