import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './features/tickets/ticketsSlice';
import userReducer from './features/users/userSlice';
import uiReducer from './features/ui/uiSlice';

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
    user: userReducer,
    ui: uiReducer,
  },
});
