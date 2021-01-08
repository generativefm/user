import { makeOpenDb } from '@alexbainter/indexed-db';
import FETCHED_USER_OBJECT_STORE_NAME from '../fetch/fetched-user-object-store-name';
import ACTION_OBJECT_STORE_NAME from '../actions/action-object-store-name';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const DB_NAME = '@generative.fm/user';
const DB_VERSION = 1;

const onUpgradeNeeded = (event) => {
  const db = event.target.result;
  db.createObjectStore(FETCHED_USER_OBJECT_STORE_NAME, { keyPath: 'userId' });
  db.createObjectStore(ACTION_OBJECT_STORE_NAME, { keyPath: 'timestamp' });
  db.createObjectStore(STATE_OBJECT_STORE_NAME, { keyPath: 'key' });
};

const openDb = makeOpenDb({
  dbName: DB_NAME,
  dbVersion: DB_VERSION,
  onUpgradeNeeded,
});

export default openDb;
