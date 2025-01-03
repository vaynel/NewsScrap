import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer, // newsSlice 등록
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
