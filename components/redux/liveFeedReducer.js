import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
} from './liveFeedActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default function liveFeedReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FEED_SUCCESS:
      return { ...state, loading: false, data: action.payload || []};
    case FETCH_FEED_FAILURE:
      return { ...state, loading: false, error: action.payload || [] };
    default:
      return state;
  }
}

