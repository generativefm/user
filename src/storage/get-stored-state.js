import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';
import IS_SUPPORTED from './is-supported';

const getStoredState = () =>
  IS_SUPPORTED
    ? openDb().then((db) =>
        promisifyRequest(
          db
            .transaction(STATE_OBJECT_STORE_NAME)
            .objectStore(STATE_OBJECT_STORE_NAME)
            .getAll()
        )
          .then((storedItems) =>
            storedItems.reduce(
              (state, { key, value }) => Object.assign(state, { [key]: value }),
              {}
            )
          )
          .catch((err) => {
            console.error(err);
            return;
          })
      )
    : Promise.resolve();

export default getStoredState;
