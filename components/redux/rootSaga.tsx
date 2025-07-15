import { all } from 'redux-saga/effects';
import liveFeedSaga from './saga';

export default function* rootSaga() {
  yield all([
    liveFeedSaga(),
    // ...add more sagas here
  ]);
}

