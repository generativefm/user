import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from '../storage/open-db';
import ACTION_OBJECT_STORE_NAME from './action-object-store-name';

const deleteActions = (actions) =>
  openDb().then((db) => {
    const objectStore = db
      .transaction(ACTION_OBJECT_STORE_NAME, 'readwrite')
      .objectStore(ACTION_OBJECT_STORE_NAME);
    return Promise.all(
      actions.map(({ meta: { timestamp } }) =>
        promisifyRequest(objectStore.delete(timestamp))
      )
    )
      .then(() => true)
      .catch((err) => {
        console.error(err);
        return false;
      });
  });

export default deleteActions;
