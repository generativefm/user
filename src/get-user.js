import ENDPOINT from './endpoint';

const CACHE_NAME = '@generative.fm/user';
const IS_CACHE_SUPPORTED = Boolean(caches);

const getUser = ({ userId, token }) => {
  if (!userId || !token) {
    return Promise.reject(
      new Error("Can't get user data without both a userId and a token")
    );
  }
  const fetchUrl = `${ENDPOINT}/user/${userId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (!IS_CACHE_SUPPORTED) {
    return fetch(fetchUrl, {
      headers,
    })
      .then((response) => (response.ok ? response.json() : {}))
      .catch((err) => {
        console.error(err);
        return {};
      });
  }
  const request = new Request(fetchUrl, { headers });
  return caches.open(CACHE_NAME).then((cache) => {
    cache
      .add(request)
      .catch(() => {
        /* ignore */
      })
      .then(() => cache.match(request))
      .then((response) => (response ? response.json() : {}))
      .catch((err) => {
        console.error(err);
        return {};
      });
  });
};

export default getUser;
