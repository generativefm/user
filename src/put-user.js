import ENDPOINT from './endpoint';

const putUser = ({ user = {}, token, changeManager } = {}) => {
  if (!user || !user.userId || !token) {
    return Promise.reject(
      new Error("Can't update user data without a userId and a token")
    );
  }
  return changeManager.recordChanges(user).then(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${ENDPOINT}/user/${user.userId}`;
    return fetch(url, {
      headers,
      method: 'PUT',
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return false;
        }
        return changeManager.clear();
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  });
};

export default putUser;
