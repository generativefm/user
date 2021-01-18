import ENDPOINT from '../endpoint';

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

const fetchWithCache = (request) =>
  caches.open(CACHE_NAME).then((cache) =>
    cache
      .add(request)
      .then(() =>
        cache
          .match(request)
          .then(transformResponse)
          .then(({ user }) => ({ user, isFresh: true }))
      )
      .catch((err) => {
        console.error(err);
        return cache.match(request).then((response) => {
          if (!response) {
            return { user: null };
          }
          return transformResponse(response).then(({ user }) => ({
            user,
            isFresh: false,
          }));
        });
      })
  );

const fetchFromNetwork = (request) =>
  fetch(request)
    .then(transformResponse)
    .then(({ user }) => ({ user, isFresh: true }))
    .catch((err) => {
      console.error(err);
      return { user: null };
    });

const fetchUser = ({ userId, token } = {}) => {
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

  if (IS_CACHE_SUPPORTED) {
    return fetchWithCache(request);
  }
  return fetchFromNetwork(request);
};

export default fetchUser;
