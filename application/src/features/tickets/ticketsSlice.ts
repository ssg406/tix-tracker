import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../../store';

const ticketsFetch = axios.create({
  baseURL: '/api/v1/tickets',
});
const currentToken = localStorage.getItem('token');
if (currentToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

type Ticket = {
  _id: string;
  status: string;
  date: string;
  description: string;
  createdBy: string;
  updatedOn: string;
};

const ticketsAdapter = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket._id,
  sortComparer: (a, b) => {
    const aDate = Date.parse(a.date);
    const bDate = Date.parse(b.date);
    return aDate > bDate ? -1 : 1;
  },
});

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: ticketsAdapter.getInitialState({
    status: 'idle',
    isEditingTicket: false,
    editingTicketId: null,
    editingTicketDate: '',
    editingTicketDescription: '',
  }),
  reducers: {
    setEditTicket(state, action) {
      state.isEditingTicket = true;
      state.editingTicketId = action.payload.ticketId;
      state.editingTicketDate = action.payload.date;
      state.editingTicketDescription = action.payload.description;
    },
    cancelEditTicket(state) {
      state.isEditingTicket = false;
      state.editingTicketId = null;
      state.editingTicketDate = '';
      state.editingTicketDescription = '';
    },
  },
});

export const { setEditTicket, cancelEditTicket } = ticketsSlice.actions;

export const ticketsSelectors = ticketsAdapter.getSelectors(
  (state: RootState) => state.tickets
);

export default ticketsSlice.reducer;
