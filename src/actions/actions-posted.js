export const ACTIONS_POSTED = 'ACTIONS_POSTED';

const actionsPosted = ({ user }) => ({
  type: ACTIONS_POSTED,
  payload: { user },
});

export default actionsPosted;
