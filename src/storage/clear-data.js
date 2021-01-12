import clearStoredActions from '../actions/clear-stored-actions';
import clearStoredState from './clear-stored-state';

const clearData = () => Promise.all([clearStoredActions(), clearStoredState()]);

export default clearData;
