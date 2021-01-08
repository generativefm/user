import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const storeStateProperties = (keyValuePairs = []) =>
  openDb().then((db) => {
    const objectStore = db
      .transaction(STATE_OBJECT_STORE_NAME, 'readwrite')
      .objectStore(STATE_OBJECT_STORE_NAME);
    return Promise.all(
      keyValuePairs.map(([key, value]) =>
        promisifyRequest(objectStore.put({ key, value }))
      )
    )
      .then(() => true)
      .catch((err) => {
        console.error(err);
        return false;
      });
  });

export default storeStateProperties;
