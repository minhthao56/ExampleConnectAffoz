import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {currentUserApi} from '../../services';

export const getCurrentUser = createAsyncThunk('currentUser/get', async () => {
  const result = await currentUserApi.getCurrentUser();
  return result;
});

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {data: {}, loading: false, error: null},
  reducers: {},
  extraReducers: {
    [getCurrentUser.pending]: state => {
      state.loading = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      const dataCurrentUser = action.payload;
      state.data = dataCurrentUser;
      state.loading = false;
    },
    [getCurrentUser.rejected]: (state, action) => {
      const error = action.error;
      state.error = error;
      state.loading = false;
    },
  },
});
const {reducer: currentUserReducer} = currentUserSlice;

export default currentUserReducer;
