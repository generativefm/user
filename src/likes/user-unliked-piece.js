export const USER_UNLIKED_PIECE = 'USER_UNLIKED_PIECE';

const userUnlikedPiece = ({ pieceId }) => ({
  type: USER_UNLIKED_PIECE,
  payload: { pieceId },
  meta: { timestamp: Date.now(), shouldPost: true },
});

export default userUnlikedPiece;
