import { combineReducers } from 'redux';
import dislikes from './dislikes/dislikes-reducer';
import likes from './likes/likes-reducer';
import history from './history/history-reducer';
import userId from './user-id/user-id-reducer';

const userDataReducer = combineReducers({
  dislikes,
  likes,
  history,
  userId,
});

export default userDataReducer;
