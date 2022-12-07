import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ticketsReducer from './features/tickets/ticketsSlice';
import userReducer from './features/users/userSlice';
import uiReducer from './features/ui/uiSlice';
import { apiSlice } from './features/api/apiSlice';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    user: userReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
