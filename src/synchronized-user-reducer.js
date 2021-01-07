import { combineReducers } from 'redux';
import userDataReducer from './user-data-reducer';
import token from './token/token-reducer';
import isFetching from './fetch/is-fetching-reducer';
import isPostingActions from './post-actions/is-posting-actions-reducer';

const synchronizationReducer = combineReducers({
  token,
  isFetching,
  isPostingActions,
});

const synchronizedUserReducer = (state, action) => {
  const userData = userDataReducer(state, action);
  const synchronization = synchronizationReducer(state, action);
  let hasChanged =
    typeof state === 'undefined' ||
    [userData, synchronization].some((nextStatePartial) =>
      Object.keys(nextStatePartial).some(
        (key) => nextStatePartial[key] !== state[key]
      )
    );
  return hasChanged ? Object.assign({}, userData, synchronization) : state;
};

export default synchronizedUserReducer;
