import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import DATA_OBJECT_STORE_NAME from './data-object-store-name';

const clearData = () =>
  openDb().then((db) =>
    promisifyRequest(
      db
        .transaction(DATA_OBJECT_STORE_NAME, 'readwrite')
        .objectStore(DATA_OBJECT_STORE_NAME)
        .clear()
    )
  );

export default clearData;
