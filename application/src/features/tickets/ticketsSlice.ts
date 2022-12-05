import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

type Ticket = {
  ticketId: string;
  status: string;
  date: string;
  description: string;
};

const ticketsAdapter = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket.ticketId,
  sortComparer: (a, b) => {
    const aDate = Date.parse(a.date);
    const bDate = Date.parse(b.date);
    return aDate > bDate ? -1 : 1;
  },
});

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: ticketsAdapter.getInitialState({ status: 'idle' }),
  reducers: {
    ticketAdded: ticketsAdapter.addOne,
    ticketsLoaded(state, action) {
      ticketsAdapter.setAll(state, action.payload.tickets);
    },
    ticketCancelled(state, action) {
      ticketsAdapter.updateOne(state, {
        id: action.payload.ticketId,
        changes: { status: 'cancelled' },
      });
    },
    ticketUpdated(state, action) {
      ticketsAdapter.updateOne(state, {
        id: action.payload.ticketId,
        changes: {
          date: action.payload.date,
          description: action.payload.description,
        },
      });
    },
  },
});

export const { ticketAdded, ticketCancelled, ticketUpdated } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
