import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import LOCAL_CHANGES_OBJECT_STORE_NAME from './local-changes-object-store-name';

const clearLocalChanges = () =>
  openDb()
    .then((db) =>
      promisifyRequest(
        db
          .transaction(LOCAL_CHANGES_OBJECT_STORE_NAME, 'readwrite')
          .objectStore(LOCAL_CHANGES_OBJECT_STORE_NAME)
          .clear()
      )
    )
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });

export default clearLocalChanges;
