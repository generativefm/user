export const PIECE_PLAYED = 'PIECE_PLAYED';

const piecePlaybackAction = (action, { pieceId }) =>
  Object.assign({}, action, {
    meta: Object.assign({}, action.meta, {
      userEvent: { type: PIECE_PLAYED, data: { pieceId } },
      timestamp: (action.meta && action.meta.timestamp) || Date.now(),
      shouldPost: true,
    }),
  });

export default piecePlaybackAction;
