import { combineReducers } from 'redux';
import userDataReducer from './user-data-reducer';
import token from './token/token-reducer';
import isFetching from './fetch/is-fetching-reducer';
import isPostingActions from './actions/is-posting-actions-reducer';

const synchronizationReducer = combineReducers({
  token,
  isFetching,
  isPostingActions,
});

const synchronizedUserReducer = (state, action) => {
  const userData = userDataReducer(state, action);
  const synchronization = synchronizationReducer(state, action);
  if (
    typeof state === 'undefined' ||
    [userData, synchronization].some((nextStatePartial) =>
      Object.keys(nextStatePartial).some(
        (key) => nextStatePartial[key] !== state[key]
      )
    )
  ) {
    return Object.assign({}, userData, synchronization);
  }
  return state;
};

export default synchronizedUserReducer;
