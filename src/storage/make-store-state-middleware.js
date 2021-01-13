import selectLikes from '../likes/select-likes';
import selectHistory from '../history/select-history';
import selectDislikes from '../dislikes/select-dislikes';
import selectPlayTime from '../play-time/select-play-time';
import storeStateProperties from './store-state-properties';
import IS_SUPPORTED from './is-supported';

const makeStoreStateMiddleware = ({ selectUser }) => {
  if (!IS_SUPPORTED) {
    return () => (next) => (action) => next(action);
  }
  const selectStoredValues = (state) => {
    const userState = selectUser(state);
    const [likes, history, dislikes, playTime] = [
      selectLikes,
      selectHistory,
      selectDislikes,
      selectPlayTime,
    ].map((selector) => selector(userState));
    return { likes, history, dislikes, playTime };
  };
  return (store) => (next) => (action) => {
    const previousState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    const previousStoredValues = selectStoredValues(previousState);
    const nextStoredValues = selectStoredValues(nextState);
    const changedKeyValuePairs = Object.keys(previousStoredValues)
      .filter((key) => previousStoredValues[key] !== nextStoredValues[key])
      .map((key) => [key, nextStoredValues[key]]);
    storeStateProperties(changedKeyValuePairs);
    return result;
  };
};

export default makeStoreStateMiddleware;
