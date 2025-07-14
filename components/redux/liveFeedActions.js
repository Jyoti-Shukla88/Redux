
export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';

export const fetchFeedRequest = () => ({ type: FETCH_FEED_REQUEST });
export const fetchFeedSuccess = (data) => ({ type: FETCH_FEED_SUCCESS, payload: data });
export const fetchFeedFailure = (error) => ({ type: FETCH_FEED_FAILURE, payload: error });
