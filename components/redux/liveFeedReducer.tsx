import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
  FeedActions,
} from './liveFeedActions';

export interface FeedItem {
  id: string;
  title: string;
  image: string;
  // Add any other fields you expect in a feed item
}

export interface LiveFeedState {
  data: FeedItem[];
  loading: boolean;
  error: string | null;
}

const initialState: LiveFeedState = {
  data: [],
  loading: false,
  error: null,
};

export default function liveFeedReducer(state: LiveFeedState = initialState, action: FeedActions): LiveFeedState {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FEED_SUCCESS:
      return { ...state, loading: false, data: action.payload || []};
    case FETCH_FEED_FAILURE:
      return { ...state, loading: false, error: action.payload || null};
    default:
      return state;
  }
}

