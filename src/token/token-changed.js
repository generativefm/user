export const TOKEN_CHANGED = 'TOKEN_CHANGED';

const tokenChanged = ({ token }) => ({
  type: TOKEN_CHANGED,
  payload: { token },
});

export default tokenChanged;
