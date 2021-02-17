import historyReducer from './history-reducer';
import piecePlaybackAction from './piece-playback-action';
import userLoggedOut from '../user-logged-out';
import userStartedAnonymousSession from '../user-started-anonymous-session';
import userAuthenticated from '../user-authenticated';
import userFetched from '../fetch/user-fetched';
import actionsPosted from '../actions/actions-posted';
import mergeData from '../merge-data';
import unmergeData from '../unmerge-data';

describe('history reducer', () => {
  it("should update a pieces's playtime for a matching action", () => {
    const mockPieceId = 'MOCK_PIECE_ID';
    const timestamp = Date.now();
    const mockAction = piecePlaybackAction(
      { meta: { timestamp } },
      { pieceId: mockPieceId }
    );
    const result = historyReducer({}, mockAction);
    expect(result).to.have.property(mockPieceId, timestamp);
  });
  it('should reset when the user logs out', () => {
    const result = historyReducer({ mockPieceId: 12345 }, userLoggedOut());
    expect(result).to.eql({});
  });
  [
    [userStartedAnonymousSession, 'anonymous'],
    [userAuthenticated, 'authenticated'],
  ].forEach(([actionCreator, sessionType]) => {
    it(`should reset when the user starts a(n) ${sessionType} session and payload.shouldClearData is true`, () => {
      const action = actionCreator({});
      action.payload = Object.assign({}, action.payload, {
        shouldClearData: true,
      });
      const result = historyReducer({ mockPieceId: 12345 }, action);
      expect(result).to.eql({});
    });
    it(`should not reset when the user starts a(n) ${sessionType} session and payload.shouldClearData is false`, () => {
      const action = actionCreator({});
      action.payload = Object.assign({}, action.payload, {
        shouldClearData: false,
      });
      const mockState = { mockPieceId: 12345 };
      const result = historyReducer(mockState, action);
      expect(result).to.eql(mockState);
    });
  });
  [userFetched, actionsPosted].forEach((actionCreator) => {
    it('should be overriden by data received over network', () => {
      const mockHistory = {
        mockPieceId: 12345,
      };
      const mockUser = {
        history: mockHistory,
      };
      const action = actionCreator({ user: mockUser });
      const result = historyReducer({}, action);
      expect(result).to.eql(mockHistory);
    });
    it('should reset itself if no data was received over the network', () => {
      const action = actionCreator({ user: {} });
      const result = historyReducer({ mockPieceId: 12345 }, action);
      expect(result).to.eql({});
    });
  });
  it('should support merging new data', () => {
    const now = Date.now();
    const mockState = {
      unaffectedPieceId: now,
      overriddenPieceId: now - 1000,
    };
    const mergedData = {
      history: {
        overriddenPieceId: now,
        newPieceId: now,
        unaffectedPieceId: mockState.unaffectedPieceId - 1000,
      },
    };
    const action = mergeData(mergedData);
    const expectedState = Object.assign({}, mockState, mergedData.history, {
      unaffectedPieceId: mockState.unaffectedPieceId,
    });
    const result = historyReducer(mockState, action);
    expect(result).to.eql(expectedState);
  });
  it("should just return the same state if there's nothing to merge", () => {
    const mockState = {
      mockPieceId: 12345,
    };
    const action = mergeData({});
    const result = historyReducer(mockState, action);
    expect(result).to.eql(mockState);
  });
  it('should support unmerging data', () => {
    const now = Date.now();
    const mockState = {
      unaffectedPieceId: now,
      overriddenPieceId: now - 1000,
    };
    const mergedData = {
      history: {
        overriddenPieceId: now,
        newPieceId: now,
        unaffectedPieceId: mockState.unaffectedPieceId - 1000,
      },
    };
    const mergeDataAction = mergeData(mergedData);
    const postMergeState = historyReducer(mockState, mergeDataAction);
    const postMergePieceId = 'POST_MERGE_PIECE_ID';
    const postMergePieceTimestamp = 12345;
    const modifiedPostMergeState = Object.assign({}, postMergeState, {
      [postMergePieceId]: postMergePieceTimestamp,
    });
    const expectedResult = Object.assign({}, mockState, {
      [postMergePieceId]: postMergePieceTimestamp,
    });
    const unmergeAction = unmergeData({
      mergedData,
      previousState: { history: mockState },
    });
    const result = historyReducer(modifiedPostMergeState, unmergeAction);
    expect(result).to.eql(expectedResult);
  });
});
