import ENDPOINT from '../endpoint';

const postActions = ({ actions, userId, token }) => {
  const postUrl = encodeURI(`${ENDPOINT}/user/${userId}/actions`);
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return fetch(postUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify({ actions }),
  })
    .then((response) => {
      if (!response.ok) {
        return { user: null };
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      return { user: null };
    });
};

export default postActions;
