export const USER_FETCHED = 'USER_FETCHED';

const userFetched = ({ user }) => ({
  type: USER_FETCHED,
  payload: { user },
});

export default userFetched;
