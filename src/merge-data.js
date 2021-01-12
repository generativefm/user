export const MERGE_DATA = 'MERGE_DATA';

const mergeData = (userData) => ({
  type: MERGE_DATA,
  payload: userData,
  meta: {
    shouldPost: true,
    timestamp: Date.now(),
  },
});

export default mergeData;
