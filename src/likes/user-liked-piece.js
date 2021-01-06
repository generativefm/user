export const USER_LIKED_PIECE = 'USER_LIKED_PIECE';

const userLikedPiece = ({ pieceId }) => ({
  type: USER_LIKED_PIECE,
  payload: { pieceId },
  meta: { timestamp: Date.now(), shouldPost: true },
});

export default userLikedPiece;
