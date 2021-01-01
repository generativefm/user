import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import DATA_OBJECT_STORE_NAME from './data-object-store-name';

const getData = () =>
  openDb().then((db) =>
    promisifyRequest(
      db
        .transaction(DATA_OBJECT_STORE_NAME)
        .objectStore(DATA_OBJECT_STORE_NAME)
        .getAll()
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
      })
  );

export default getData;
