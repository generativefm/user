import clearFetchedUser from './clear-fetched-user';
import clearStoredActions from './clear-stored-actions';

const clearData = () => Promise.all([clearFetchedUser(), clearStoredActions()]);

export default clearData;
