import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from '../storage/open-db';
import ACTION_OBJECT_STORE_NAME from './action-object-store-name';

const getStoredActions = () =>
  openDb().then((db) =>
    promisifyRequest(
      db
        .transaction(ACTION_OBJECT_STORE_NAME)
        .objectStore(ACTION_OBJECT_STORE_NAME)
        .getAll()
    )
      .then((actions) => actions)
      .catch((err) => {
        console.error(err);
        return [];
      })
  );

export default getStoredActions;
