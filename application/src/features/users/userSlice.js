import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const currentUser = localStorage.getItem('user');
const currentToken = localStorage.getItem('token');

// Create Axios instance and set base URL
const axiosInstance = axios.create({
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

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userObject) => {
    try {
      const { data } = await axiosInstance.post('auth/register', userObject);
      const { user, token } = data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return { user, token, message: 'User created successfully' };
    } catch (error) {
      return { message: error.response.data.message };
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: currentUser || null,
    token: currentToken || null,
    status: 'idle',
    alertText: null,
  },
  reducers: {},
});
