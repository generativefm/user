import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import FETCHED_USER_OBJECT_STORE_NAME from './fetched-user-object-store-name';

const storeFetchedUser = (user) =>
  openDb()
    .then((db) =>
      promisifyRequest(
        db
          .transaction(FETCHED_USER_OBJECT_STORE_NAME, 'readwrite')
          .objectStore(FETCHED_USER_OBJECT_STORE_NAME)
          .put(user)
      )
    )
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });

export default storeFetchedUser;
