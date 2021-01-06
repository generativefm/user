export const USER_DISLIKED_PIECE = 'USER_DISLIKED_PIECE';

const userDislikedPiece = ({ pieceId }) => ({
  type: USER_DISLIKED_PIECE,
  payload: { pieceId },
  meta: { timestamp: Date.now(), shouldPost: true },
});

export default userDislikedPiece;
