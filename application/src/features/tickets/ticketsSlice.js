import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    status: 'idle',
    alertText: null,
  },
  reducers: {},
});
