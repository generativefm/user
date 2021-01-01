import { makeOpenDb } from '@alexbainter/indexed-db';
import dataObjectStoreName from './data-object-store-name';

const DB_NAME = '@generative.fm/user';
const DB_VERSION = 1;

const onUpgradeNeeded = (event) => {
  const db = event.target.result;
  db.createObjectStore(dataObjectStoreName);
};

const openDb = makeOpenDb({
  dbName: DB_NAME,
  dbVersion: DB_VERSION,
  onUpgradeNeeded,
});

export default openDb;
