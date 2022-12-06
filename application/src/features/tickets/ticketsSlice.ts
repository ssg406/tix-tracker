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
};

const ticketsAdapter = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket._id,
  sortComparer: (a, b) => {
    const aDate = Date.parse(a.date);
    const bDate = Date.parse(b.date);
    return aDate > bDate ? -1 : 1;
  },
});

export const loadTickets = createAsyncThunk(
  'tickets/ticketsLoaded',
  async (ticketData, { rejectWithValue }) => {
    try {
      const { data } = await ticketsFetch.get('/all/?status=all&sort=newest');
      return { tickets: data };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.message });
      } else {
        return rejectWithValue({ message: 'Internal Error' });
      }
    }
  }
);

export const addTicket = createAsyncThunk(
  'tickets/addTicket',
  async (ticketData, { rejectWithValue }) => {
    try {
      const { data } = await ticketsFetch.post('/new', ticketData);
      return { ticket: data.ticket };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.message });
      } else {
        return rejectWithValue({ message: 'Internal Error' });
      }
    }
  }
);

export const cancelTicket = createAsyncThunk(
  'tickets/cancelTicket',
  async (ticketId, { rejectWithValue }) => {
    try {
      const { data } = await ticketsFetch.patch(`/cancel/${ticketId}`);
      return { ticket: data.ticket };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.message });
      } else {
        return rejectWithValue({ message: 'Internal Error' });
      }
    }
  }
);

export const updateTicket = createAsyncThunk(
  'tickets/updateTicket',
  async (ticketData, { rejectWithValue }) => {
    try {
      const { data } = await ticketsFetch.patch('/update', ticketData);
      return { ticket: data.ticket };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.message });
      } else {
        return rejectWithValue({ message: 'Internal Error' });
      }
    }
  }
);

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: ticketsAdapter.getInitialState({ status: 'idle' }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTickets.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(loadTickets.fulfilled, (state, action) => {
      state.status = 'idle';
      ticketsAdapter.setAll(state, action.payload.tickets);
    });
    builder.addCase(loadTickets.rejected, (state, action) => {
      state.status = 'error';
    });
    builder.addCase(addTicket.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addTicket.fulfilled, (state, action) => {
      state.status = 'idle';
      ticketsAdapter.addOne(state, action.payload.ticket);
    });
    builder.addCase(addTicket.rejected, (state, action) => {
      state.status = 'error';
    });
    builder.addCase(updateTicket.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      state.status = 'idle';
      ticketsAdapter.updateOne(state, {
        id: action.payload.ticket._id,
        changes: {
          date: action.payload.ticket.date,
          description: action.payload.ticket.description,
        },
      });
    });
    builder.addCase(updateTicket.rejected, (state, action) => {
      state.status = 'error';
    });
  },
});

export const ticketsSelectors = ticketsAdapter.getSelectors(
  (state: RootState) => state.tickets
);

export default ticketsSlice.reducer;
