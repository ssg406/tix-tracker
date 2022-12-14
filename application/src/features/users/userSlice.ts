import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import axios, { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { RootState } from '../../store';

const currentUser = localStorage.getItem('user');
const currentToken = localStorage.getItem('token');

// Types
interface UserState {
  user: object | null;
  token: string | null;
  status: string;
  showAlert: boolean;
  alertType: string;
  alertMessage: string;
}

const initialState: UserState = {
  user: currentUser ? JSON.parse(currentUser) : null,
  token: currentToken ? currentToken : null,
  status: 'idle',
  showAlert: false,
  alertType: '',
  alertMessage: '',
};

// Create Axios instance and set base URL
const authFetch = axios.create({
  baseURL: '/api/v1',
});

// Configure auth headers
if (currentToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

const addUserToLocalStorage = (user: object, token: string) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userObject: object, { rejectWithValue }) => {
    try {
      const { data } = await authFetch.post('auth/register', userObject);
      const { user, token } = data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
      addUserToLocalStorage(user, token);
      return { user, token };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.message });
      } else {
        return rejectWithValue({ message: 'Internal Error' });
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userObject: object, { rejectWithValue }) => {
    try {
      const { data } = await authFetch.post('auth/login', userObject);
      const { user, token } = data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
      addUserToLocalStorage(user, token);
      return { user, token };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.message });
      } else {
        return rejectWithValue({ message: error });
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userObject: object, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const { data } = await authFetch.patch('auth/updateUser', userObject, {
        headers: { Authorization: `Bearer ${state.user.token}` },
      });
      const { user, token } = data;
      addUserToLocalStorage(user, token);
      return { user, token };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.message });
      } else {
        return rejectWithValue({ message: 'Internal Error' });
      }
    }
  }
);

export const hideAlert = createAsyncThunk('user/hideAlert', async () => {
  setTimeout(() => {
    return Promise.resolve();
  }, 3000);
});

export const logoutUser = createAsyncThunk('user/logoutUser', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return Promise.resolve();
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // some reducers
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, action: AnyAction) => {
      const { user, token } = action.payload;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.alertType = 'success';
      state.alertMessage = 'User logged in successfully';
      state.showAlert = true;
    });
    builder.addCase(registerUser.rejected, (state, action: AnyAction) => {
      state.status = 'idle';
      state.showAlert = true;
      state.alertType = 'error';
      state.alertMessage = action.payload.message;
    });
    builder.addCase(hideAlert.fulfilled, (state, action) => {
      state.showAlert = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
      state.token = null;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action: AnyAction) => {
      state.status = 'idle';
      state.showAlert = true;
      state.alertType = 'error';
      state.alertMessage = action.payload.message;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(updateUser.rejected, (state, action: AnyAction) => {
      state.status = 'error';
      state.alertMessage = action.payload.message;
      state.alertType = 'error';
    });
  },
});

export default userSlice.reducer;
