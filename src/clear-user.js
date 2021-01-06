import clearFetchedUser from './storage/clear-fetched-user';
import IS_STORAGE_SUPPORTED from './storage/is-supported';

const clearUser = ({ changeManager }) => {
  const clearPromises = [changeManager.clear()];
  if (IS_STORAGE_SUPPORTED) {
    clearPromises.push(clearFetchedUser());
  }
  return Promise.all(clearPromises).then((results) =>
    results.every((result) => result)
  );
};

export default clearUser;
