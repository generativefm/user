import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const clearStoredState = () =>
  openDb().then((db) =>
    promisifyRequest(
      db
        .transaction(STATE_OBJECT_STORE_NAME, 'readwrite')
        .objectStore(STATE_OBJECT_STORE_NAME).clear
    )
      .then(() => true)

      .catch((err) => {
        console.error(err);
        return false;
      })
  );

export default clearStoredState;
