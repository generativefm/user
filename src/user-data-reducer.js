import { combineReducers } from 'redux';
import dislikes from './dislikes/dislikes-reducer';
import likes from './likes/likes-reducer';
import history from './history/history-reducer';
import userId from './user-id/user-id-reducer';
import playTime from './play-time/play-time-reducer';

const userDataReducer = combineReducers({
  dislikes,
  likes,
  history,
  userId,
  playTime,
});

export default userDataReducer;
