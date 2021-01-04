import IS_STORAGE_SUPPORTED from './storage/is-supported';
import getLocalChanges from './storage/get-local-changes';
import storeLocalChanges from './storage/store-local-changes';
import clearLocalChanges from './storage/clear-local-changes';

const createInMemoryChangeManager = () => {
  const map = new Map();
  const recordChanges = (partialUser = {}) => {
    Object.keys(partialUser).forEach((key) => {
      map.set(key, partialUser[key]);
    });
    return Promise.resolve(true);
  };
  const applyChanges = (user = {}) =>
    Promise.resolve(
      Array.from(map).reduce((updatedUser, [key, value]) => {
        updatedUser[key] = value;
        return updatedUser;
      }, Object.assign({}, user))
    );
  const clear = () => {
    map.clear();
    return Promise.resolve(true);
  };
  const has = (key) => Promise.resolve(map.has(key));
  return Promise.resolve({
    recordChanges,
    applyChanges,
    clear,
    has,
  });
};

const createChangeManagerWithStorage = () =>
  Promise.all(createInMemoryChangeManager(), getLocalChanges()).then(
    ([inMemoryChangeManager, storedChangesPartial]) =>
      inMemoryChangeManager.recordChanges(storedChangesPartial).then(() => {
        const recordChanges = (partialUser = {}) =>
          Promise.all([
            inMemoryChangeManager.recordChanges(partialUser),
            storeLocalChanges(partialUser),
          ]).then((results) => results.every((result) => result));
        const clear = () =>
          Promise.all([
            inMemoryChangeManager.clear(),
            clearLocalChanges(),
          ]).then((results) => results.every((result) => result));
        return {
          recordChanges,
          clear,
          applyChanges: inMemoryChangeManager.applyChanges,
        };
      })
  );

const createChangeManager = () =>
  IS_STORAGE_SUPPORTED
    ? createChangeManagerWithStorage()
    : createInMemoryChangeManager();

export default createChangeManager;
