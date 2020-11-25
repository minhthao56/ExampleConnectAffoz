import {createSlice} from '@reduxjs/toolkit';

const changeViewReducer = createSlice({
  name: 'change',
  initialState: false,
  reducers: {
    changeHome(state, action) {
      return true;
    },
    changeLogin() {
      return false;
    },
  },
});

const {actions, reducer} = changeViewReducer;
export const {changeHome,changeLogin} = actions;
export default reducer;
