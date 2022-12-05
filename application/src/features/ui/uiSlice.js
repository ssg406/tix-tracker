import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showMobileNav: false,
    statusFilter: '',
    sortOption: '',
  },
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
  },
});

export const { showNavDrawer, hideNavDrawer, setStatusFilter, setSortOption } =
  uiSlice.actions;

export default uiSlice.reducer;
