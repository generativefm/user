import ENDPOINT from './endpoint';
import IS_INDEXED_DB_SUPPORTED from './storage/is-supported';
import getFetchedUser from './storage/get-fetched-user';
import storeFetchedUser from './storage/store-fetched-user';

const CACHE_NAME = '@generative.fm/user';
const IS_CACHE_SUPPORTED = Boolean(caches);

const transformResponse = (response) => {
  if (!response.ok) {
    return null;
  }
  return response.json().catch((err) => {
    console.error(err);
    return null;
  });
};

const retrieveWithCache = (request) =>
  caches.open(CACHE_NAME).then((cache) => {
    cache
      .add(request)
      .catch((err) => {
        console.error(err);
      })
      .then(() => cache.match(request))
      .then(transformResponse);
  });

const retrieveFromNetwork = (request) =>
  fetch(request)
    .then(transformResponse)
    .catch((err) => {
      console.error(err);
      return null;
    });

const retrieveWithIndexedDB = ({ request, userId }) =>
  retrieveFromNetwork(request).then((user) => {
    if (user === null) {
      return getFetchedUser(userId);
    }
    return storeFetchedUser(user)
      .catch((err) => {
        console.error(err);
      })
      .then(() => user);
  });

const getUser = ({ userId, token, changeManager } = {}) => {
  if (!userId || !token) {
    return Promise.reject(
      new Error("Can't get user data without a userId and a token")
    );
  }
  const fetchUrl = `${ENDPOINT}/user/${userId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const request = new Request(fetchUrl, { headers });

  let retrievalPromise;
  if (IS_CACHE_SUPPORTED) {
    retrievalPromise = retrieveWithCache(request);
  } else if (IS_INDEXED_DB_SUPPORTED) {
    retrievalPromise = retrieveWithIndexedDB({ request, userId });
  } else {
    retrievalPromise = retrieveFromNetwork(request);
  }
  return retrievalPromise.then((user) => changeManager.applyChanges(user));
};

export default getUser;
