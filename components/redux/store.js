import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist'
import {reducer} from './reducer';
import liveFeedReducer from './liveFeedReducer';

const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware ();
const middleware = [sagaMiddleware];
const rootReducer = combineReducers({
  liveFeed: liveFeedReducer,
  reducer,
});

const persistConfig={
key: 'root',
storage: AsyncStorage,
whitelist: ['liveFeed','reducer'] //only persist the feed data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer : persistedReducer,
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat (...middleware),
});

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);
export default store;