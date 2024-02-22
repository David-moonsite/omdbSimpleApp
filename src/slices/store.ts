import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import moviesStoreReducer from './MoviesStore/MoviesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {combineReducers} from 'redux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['moviesStore'],
};

const moviesStorePersistConfig = {
  key: 'moviesStore',
  version: 1,
  storage: AsyncStorage,
};

// Combine individual reducers into one rootReducer
const reducer = combineReducers({
  moviesStore: persistReducer(moviesStorePersistConfig, moviesStoreReducer),
});

// Create a root-level persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the Redux store with the persisted reducer and middleware
//This is important when you want to persist your Redux state,
// as not all actions can be safely serialized.
// The middleware helps catch actions that might cause issues during serialization
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // This allows the store to be persisted and rehydrated
      // without throwing errors due to non-serializable actions.
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export types for better TypeScript support
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
