import { FETCH_USER } from './fetch-user';
import fetchUser from './fetch-user';
import userFetched from './user-fetched';
import selectIsPostingActions from '../post-actions/select-is-posting-actions';

const makeFetchUserMiddleware = ({ selectUser }) => (store) => (next) => (
  action
) => {
  if (action.type !== FETCH_USER) {
    return next(action);
  }
  const isPostingActions = selectIsPostingActions(selectUser(store.getState()));
  if (isPostingActions) {
    return next(action);
  }
  fetchUser(/* TODO args */).then((user) => {
    store.dispatch(userFetched({ user }));
  });
  return next(action);
};

export default makeFetchUserMiddleware;
