export const UNMERGE_DATA = 'UNMERGE_DATA';

const unmergeData = ({ mergedData, previousState, currentState }) => ({
  type: UNMERGE_DATA,
  payload: { mergedData, previousState },
  meta: {
    currentState,
    shouldPost: true,
    timestamp: Date.now(),
  },
});

export default unmergeData;
