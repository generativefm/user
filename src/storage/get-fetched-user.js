import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import FETCHED_USER_OBJECT_STORE_NAME from './fetched-user-object-store-name';

const getFetchedUser = (userId) =>
  openDb()
    .then((db) =>
      promisifyRequest(
        db
          .transaction(FETCHED_USER_OBJECT_STORE_NAME)
          .objectStore(FETCHED_USER_OBJECT_STORE_NAME)
          .get(userId)
      )
    )
    .catch((err) => {
      console.error(err);
      return null;
    });

export default getFetchedUser;
