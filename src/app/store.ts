import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistReducer} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import logger from 'redux-logger';
import userSlice from '../features/userSlice'
import roomSlice from '../features/roomSlice';
import bookingSlice from '../features/bookingSlice';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const reducers:any= combineReducers({
    user: userSlice,
    rooms:roomSlice,
    booking:bookingSlice
});

const _persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: _persistedReducer,
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



/**

const persistConfig = {
    key: 'root',
    storage: storage,
   stateReconciler: hardSet,
};

const store = configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

 */