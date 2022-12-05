import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const currentUser = localStorage.getItem('user');
const currentToken = localStorage.getItem('token');

// Create Axios instance and set base URL
const authFetch = axios.create({
  baseURL: '/api/v1',
});

// Configure auth headers
if (currentToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
}

const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userObject, { rejectWithValue }) => {
    try {
      const { data } = await authFetch.post('auth/register', userObject);
      const { user, token } = data;
      return { user, token };
    } catch (error) {
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const hideAlert = createAsyncThunk('user/hideAlert', async () => {
  setTimeout(() => {
    return Promise.fulfilled();
  }, 3000);
});

export const logoutUser = createAsyncThunk('user/logoutUser', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return Promise.fulfilled();
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: currentUser || null,
    token: currentToken || null,
    status: 'idle',
    showAlert: false,
    alertType: '',
    alertMessage: '',
  },
  reducers: {
    // some reducers
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { user, token } = action.payload;
      addUserToLocalStorage({ user, token });
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.alertType = 'success';
      state.alertMessage = 'User logged in successfully';
      state.showAlert = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
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
  },
});

export default userSlice.reducer;
