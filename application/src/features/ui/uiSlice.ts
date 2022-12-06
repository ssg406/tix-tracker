import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  showMobileNav: boolean;
  statusFilter: 'cancelled' | 'in-progress' | 'closed' | 'open' | 'all';
  sortOption: 'newest' | 'oldest';
  showAlert: boolean;
  alertType: 'error' | 'success';
  alertMessage: string;
}

const initialState: UiState = {
  showMobileNav: false,
  statusFilter: 'all',
  sortOption: 'newest',
  showAlert: false,
  alertType: 'success',
  alertMessage: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showNavDrawer(state, action) {
      state.showMobileNav = true;
    },
    hideNavDrawer(state, action) {
      state.showMobileNav = false;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload.status;
    },
    setSortOption(state, action) {
      state.sortOption = action.payload.sortOption;
    },
    showAlert(state, action) {
      state.showAlert = true;
      state.alertMessage = action.payload.message;
      state.alertType = action.payload.alertType;
    },
    hideAlert(state, action) {
      state.showAlert = false;
      state.alertMessage = '';
    },
  },
});

export const { showNavDrawer, hideNavDrawer, setStatusFilter, setSortOption } =
  uiSlice.actions;

export default uiSlice.reducer;
