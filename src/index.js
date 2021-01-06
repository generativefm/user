import getUser from './get-user';
import updateUser from './update-user';
import createChangeManager from './create-change-manager';
import clearUser from './clear-user';

const getChangeManager = () => {
  let changeManagerPromise;
  if (!changeManagerPromise) {
    changeManagerPromise = createChangeManager();
  }
  return changeManagerPromise;
};

const wrapWithChangeManager = (fn) => (params = {}) =>
  getChangeManager().then((changeManager) =>
    fn(Object.assign({}, params, { changeManager }))
  );

const wrappedGet = wrapWithChangeManager(getUser);
const wrappedUpdate = wrapWithChangeManager(updateUser);
const wrappedClear = wrapWithChangeManager(clearUser);

export {
  wrappedGet as getUser,
  wrappedUpdate as updateUser,
  wrappedClear as clearUser,
};
