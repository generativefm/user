import { makeOpenDb } from '@alexbainter/indexed-db';
import FETCHED_USER_OBJECT_STORE_NAME from './fetched-user-object-store-name';
import ACTION_OBJECT_STORE_NAME from './action-object-store-name';

const DB_NAME = '@generative.fm/user';
const DB_VERSION = 1;

const onUpgradeNeeded = (event) => {
  const db = event.target.result;
  db.createObjectStore(FETCHED_USER_OBJECT_STORE_NAME, { keyPath: 'userId' });
  db.createObjectStore(ACTION_OBJECT_STORE_NAME, { keyPath: 'timestamp' });
};

const openDb = makeOpenDb({
  dbName: DB_NAME,
  dbVersion: DB_VERSION,
  onUpgradeNeeded,
});

export default openDb;
