import clearFetchedUser from '../fetch/clear-fetched-user';
import clearStoredActions from '../actions/clear-stored-actions';
import clearStoredState from './clear-stored-state';

const clearData = () =>
  Promise.all([clearFetchedUser(), clearStoredActions(), clearStoredState()]);

export default clearData;
