import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import LOCAL_CHANGES_OBJECT_STORE_NAME from './local-changes-object-store-name';

const storeLocalChanges = (partialUser = {}) =>
  openDb()
    .then((db) => {
      const objectStore = db
        .transaction(LOCAL_CHANGES_OBJECT_STORE_NAME, 'readwrite')
        .objectStore(LOCAL_CHANGES_OBJECT_STORE_NAME);
      return Promise.all(
        Object.keys(partialUser).map((key) =>
          promisifyRequest(objectStore.put({ key, value: partialUser[key] }))
        )
      );
    })
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });

export default storeLocalChanges;
