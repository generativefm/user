import makeFetchMiddleware from './fetch/make-fetch-middleware';
import makePostActionsMiddleware from './post-actions/make-post-actions-middleware';

const makeUserMiddleware = (...args) => (store) => (next) => {
  const dispatches = [
    makeFetchMiddleware,
    makePostActionsMiddleware,
  ].map((makeMiddleware) => makeMiddleware(...args)(store)(next));
  return (action) => dispatches.reduce((a, dispatch) => dispatch(a), action);
};

export default makeUserMiddleware;
