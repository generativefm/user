export const PLAY_TIME_INCREASED = 'PLAY_TIME_INCREASED';

const playTimeIncreased = ({ additionalPlayTime }) => ({
  type: PLAY_TIME_INCREASED,
  payload: { additionalPlayTime },
});

export default playTimeIncreased;
