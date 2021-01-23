import backupKeys from './backup-keys';

const hasAnonymousData = (anonymousDataBackup) =>
  typeof anonymousDataBackup === 'object' &&
  backupKeys.some(
    (key) =>
      typeof anonymousDataBackup[key] === 'object' &&
      Object.keys(anonymousDataBackup[key]).length > 0
  );

export default hasAnonymousData;
