import { call, put, takeLatest } from 'redux-saga/effects';
import { XMLParser } from 'fast-xml-parser';
import {
  FETCH_FEED_REQUEST,
  fetchFeedSuccess,
  fetchFeedFailure,
} from './liveFeedActions';
import { FeedItem } from './liveFeedReducer';

const RSS_FEED_URL = 'https://lorem-rss.herokuapp.com/feed?unit=second&interval=5&length=40';

function parseRSS(xml: string): FeedItem[]  {
  const parser = new XMLParser();
  const json = parser.parse(xml);
  const items = json.rss?.channel?.item || [];
  return Array.isArray(items) ? items : [items];
}

export function* SagaData() {
  try {
    const response : Response = yield call(fetch, RSS_FEED_URL);
    const text: string = yield call([response, 'text']);
    const items: FeedItem[] = parseRSS(text);
    console.log ('Fetched items:', items);
    yield put(fetchFeedSuccess(items));
  } catch (error: any) {
    console.log('Fetch error:', error.message);
    yield put(fetchFeedFailure(error.message));
  }
}

export default function* liveFeedSaga() {
  yield takeLatest(FETCH_FEED_REQUEST, SagaData);
}
