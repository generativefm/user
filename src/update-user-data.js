import endpoint from './endpoint';

const currentUserData = new Map();

const updateUserData = (partialUser = {}) => {
  Object.keys(partialUser).forEach((key) => {
    currentUserData.set(key, partialUser[key]);
  });

  const url = `${endpoint}/user/${currentUserData.get('userId')}`;
  fetch(url, { method: 'PUT', body: JSON.stringify(partialUser) }).then(
    (response) => {
      if (!response.ok) {
        return Array.from(currentUserData).reduce((o, [key, value]) => {
          o[key] = value;
          return o;
        }, {});
      }
      return response.json();
    }
  );
};
