import { PIECE_PLAYED } from './piece-playback-action';

const isPiecePlaybackAction = (action) =>
  action &&
  action.meta &&
  action.meta.userEvent &&
  action.meta.userEvent.type === PIECE_PLAYED &&
  action.meta.userEvent.data &&
  typeof action.meta.userEvent.data.pieceId === 'string';

export default isPiecePlaybackAction;
