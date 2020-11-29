import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import changeViewReducre from '../slice/changeView';
import currentUser from '../slice/currentUserSlice';

const rootReducer = {
  auth: authReducer,
  changeView: changeViewReducre,
  currentUser,
};

const store = configureStore({reducer: rootReducer});
export default store;
