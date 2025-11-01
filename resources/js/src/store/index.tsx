import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import AuthSlice from './AuthSlice';

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
    },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
