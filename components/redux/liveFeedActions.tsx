
export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST' as const ;
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS' as const ;
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE' as const;

interface FeedItem {
  id: string;
  title: string;
  image: string;
  // Add other properties if needed
}

// Action interfaces
interface FetchFeedRequestAction {
  type: typeof FETCH_FEED_REQUEST;
}

interface FetchFeedSuccessAction {
  type: typeof FETCH_FEED_SUCCESS;
  payload: FeedItem[];
}

interface FetchFeedFailureAction {
  type: typeof FETCH_FEED_FAILURE;
  payload: string;
}

export const fetchFeedRequest = (): FetchFeedRequestAction => ({ 
    type: FETCH_FEED_REQUEST,
 });

export const fetchFeedSuccess = (data: FeedItem[]): 
FetchFeedSuccessAction => ({ 
    type: FETCH_FEED_SUCCESS, 
    payload: data 
});

export const fetchFeedFailure = (error: string):
FetchFeedFailureAction => ({ 
    type: FETCH_FEED_FAILURE, 
    payload: error 
});

export type FeedActions =
  | FetchFeedRequestAction
  | FetchFeedSuccessAction
  | FetchFeedFailureAction;