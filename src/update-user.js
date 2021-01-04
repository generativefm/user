import ENDPOINT from './endpoint';

const updateUser = ({ partialUser = {}, token, changeManager } = {}) => {
  if (!partialUser || !partialUser.userId || !token) {
    return Promise.reject(
      new Error("Can't update user data without a userId and a token")
    );
  }
  return changeManager.recordChanges(partialUser).then(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${ENDPOINT}/user/${partialUser.userId}`;
    return fetch(url, {
      headers,
      method: 'PUT',
      body: JSON.stringify(partialUser),
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

export default updateUser;
