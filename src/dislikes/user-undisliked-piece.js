export const USER_UNDISLIKED_PIECE = 'USER_UNDISLIKED_PIECE';

const userUndislikedPiece = ({ pieceId }) => ({
  type: USER_UNDISLIKED_PIECE,
  payload: { pieceId },
  meta: { timestamp: Date.now(), shouldPost: true },
});

export default userUndislikedPiece;
