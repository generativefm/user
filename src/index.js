import getUser from './get-user';
import updateUser from './update-user';
import createChangeManager from './create-change-manager';

const getChangeManager = () => {
  let changeManagerPromise;
  if (!changeManagerPromise) {
    changeManagerPromise = createChangeManager();
  }
  return changeManagerPromise;
};

const wrapWithChangeManager = (fn) => (params) =>
  getChangeManager().then((changeManager) =>
    fn(Object.assign({}, params, { changeManager }))
  );

const wrappedGet = wrapWithChangeManager(getUser);
const wrappedUpdate = wrapWithChangeManager(updateUser);

export { wrappedGet as getUser, wrappedUpdate as updateUser };
