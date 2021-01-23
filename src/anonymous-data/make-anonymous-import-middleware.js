import { USER_AUTHENTICATED } from '../user-authenticated';
import mergeData from '../merge-data';
import selectAnonymousDataBackup from './select-anonymous-data-backup';
import hasAnonymousData from './has-anonymous-data';
import unmergeData from '../unmerge-data';
import selectUserId from '../user-id/select-user-id';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';

const makeAnonymousImportMiddleware = ({
  selectUser,
  selectIsAnonymousImportingEnabled,
}) => (store) => (next) => {
  let preMergeUser;
  const postMergeActions = [];
  return (action) => {
    const previousState = store.getState();
    const previousUser = selectUser(store.getState());
    const userId = selectUserId(previousUser);
    if (action.type === USER_AUTHENTICATED && userId === null) {
      action.meta = Object.assign({}, action.meta, {
        previousState: previousUser,
      });
    }
    const wasAnonymousImportingEnabled = selectIsAnonymousImportingEnabled(
      previousState
    );
    const result = next(action);
    const nextState = store.getState();
    const nextUser = selectUser(nextState);
    const isAnonymousImportingEnabled = selectIsAnonymousImportingEnabled(
      nextState
    );
    if (
      (action.type === USER_AUTHENTICATED && isAnonymousImportingEnabled) ||
      (userId !== null &&
        !wasAnonymousImportingEnabled &&
        isAnonymousImportingEnabled)
    ) {
      const anonymousDataBackup = selectAnonymousDataBackup(nextUser);
      if (!hasAnonymousData(anonymousDataBackup)) {
        return result;
      }
      preMergeUser = nextUser;
      store.dispatch(
        mergeData(anonymousDataBackup, {
          shouldNotRedoAfterAnonymousDataMerge: true,
        })
      );
      return result;
    }
    if (userId === null || action.type === USER_STARTED_ANONYMOUS_SESSION) {
      return result;
    }
    if (
      preMergeUser &&
      action.meta &&
      action.meta.shouldPost &&
      !action.meta.shouldNotRedoAfterAnonymousDataMerge
    ) {
      postMergeActions.push(action);
      return result;
    }
    if (
      preMergeUser &&
      wasAnonymousImportingEnabled &&
      !isAnonymousImportingEnabled
    ) {
      const anonymousDataBackup = selectAnonymousDataBackup(previousUser);
      const result = next(action);
      const unmergeDataAction = unmergeData({
        mergedData: anonymousDataBackup,
        previousState: preMergeUser,
        currentState: selectUser(store.getState()),
      });
      preMergeUser = null;
      [unmergeDataAction]
        .concat(postMergeActions.splice(0))
        .forEach((unmergeAction) => {
          store.dispatch(unmergeAction);
        });
      return result;
    }
    return result;
  };
};

export default makeAnonymousImportMiddleware;
