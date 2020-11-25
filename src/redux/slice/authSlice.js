import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {authenticationApi} from '../../services';

export const login = createAsyncThunk('auth/login', async (data) => {
  const resultLogin = await authenticationApi.postLogin(data);
  return resultLogin;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {accessToken: '', loading: false, error: null},
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      const accessToken = action.payload.accessToken;
      state.accessToken = accessToken;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      const error = action.error;
      state.error = error;
      state.loading = false;
    },
  },
});
const {reducer: authReducer} = authSlice;

export default authReducer;
