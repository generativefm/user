import { USER_AUTHENTICATED } from '../user-authenticated';
import { USER_STARTED_ANONYMOUS_SESSION } from '../user-started-anonymous-session';
import selectUserId from '../user-id/select-user-id';
import backupKeys from './backup-keys';

const anonymousDataBackupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED: {
      if (!action.meta || !action.meta.previousState) {
        return state;
      }
      const { previousState } = action.meta;
      const previousUserId = selectUserId(previousState);
      if (previousUserId !== null) {
        return state;
      }
      return backupKeys.reduce((o, key) => {
        o[key] = previousState[key];
        return o;
      }, {});
    }
    case USER_STARTED_ANONYMOUS_SESSION: {
      return {};
    }
  }
  return state;
};

export default anonymousDataBackupReducer;
