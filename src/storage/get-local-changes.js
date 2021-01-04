import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import LOCAL_CHANGES_OBJECT_STORE_NAME from './local-changes-object-store-name';

const getLocalChanges = () =>
  openDb()
    .then((db) =>
      promisifyRequest(
        db
          .transaction(LOCAL_CHANGES_OBJECT_STORE_NAME)
          .objectStore(LOCAL_CHANGES_OBJECT_STORE_NAME)
          .getAll()
      )
    )
    .then((records) =>
      records.reduce((o, { key, value }) => {
        o[key] = value;
        return o;
      }, {})
    )
    .catch((err) => {
      console.error(err);
      return {};
    });

export default getLocalChanges;
