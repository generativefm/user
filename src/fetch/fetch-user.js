import ENDPOINT from '../endpoint';
import IS_INDEXED_DB_SUPPORTED from '../storage/is-supported';
import getFetchedUser from '../storage/get-fetched-user';
import storeFetchedUser from '../storage/store-fetched-user';

const CACHE_NAME = '@generative.fm/user';
const IS_CACHE_SUPPORTED = Boolean(caches);

const transformResponse = (response) => {
  if (!response.ok) {
    return { user: null };
  }
  return response.json().catch((err) => {
    console.error(err);
    return { user: null };
  });
};

const retrieveWithCache = (request) =>
  caches.open(CACHE_NAME).then((cache) => {
    cache
      .add(request)
      .then(() =>
        cache
          .match(request)
          .then(transformResponse)
          .then((user) => ({ user, isFresh: true }))
      )
      .catch((err) => {
        console.error(err);
        return cache.match(request).then((response) => {
          if (!response) {
            return { user: null };
          }
          return transformResponse(response).then((user) => ({
            user,
            isFresh: false,
          }));
        });
      });
  });

const retrieveFromNetwork = (request) =>
  fetch(request)
    .then(transformResponse)
    .then((user) => ({ user, isFresh: true }))
    .catch((err) => {
      console.error(err);
      return { user: null };
    });

const retrieveWithIndexedDB = ({ request, userId }) =>
  retrieveFromNetwork(request).then(({ user }) => {
    if (user === null) {
      return getFetchedUser(userId).then((storedUser) => ({
        user: storedUser,
        isFresh: false,
      }));
    }
    return storeFetchedUser(user)
      .catch((err) => {
        console.error(err);
      })
      .then(() => ({ user, isFresh: true }));
  });

const getUser = ({ userId, token } = {}) => {
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
  return retrievalPromise;
};

export default getUser;
