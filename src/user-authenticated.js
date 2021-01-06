export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';

const userAuthenticated = ({ userId, token }) => ({
  type: USER_AUTHENTICATED,
  payload: { userId, token },
});

export default userAuthenticated;
