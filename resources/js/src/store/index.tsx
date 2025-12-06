import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import AuthSlice from './AuthSlice';
import { api } from '../api/api';

// const rootReducer = combineReducers({
//     themeConfig: themeConfigSlice,
// });

// export default configureStore({
//     reducer: rootReducer,
// });

// export type IRootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: {
        themeConfig: themeConfigSlice,
        auth: AuthSlice,

        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
