export const USER_PLAYED_PIECE = 'USER_PLAYED_PIECE';

const userPlayedPiece = ({ pieceId }) => ({
  type: USER_PLAYED_PIECE,
  payload: { pieceId },
  meta: { timestamp: Date.now(), shouldPost: true },
});

export default userPlayedPiece;
