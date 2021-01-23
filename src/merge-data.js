export const MERGE_DATA = 'MERGE_DATA';

const mergeData = (
  userData,
  { shouldNotRedoAfterAnonymousDataMerge = false }
) => ({
  type: MERGE_DATA,
  payload: userData,
  meta: {
    shouldNotRedoAfterAnonymousDataMerge,
    shouldPost: true,
    timestamp: Date.now(),
  },
});

export default mergeData;
