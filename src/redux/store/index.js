import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import changeViewReducre from "../slice/changeView"

const rootReducer = {
  auth: authReducer,
  changeView: changeViewReducre
};

const store = configureStore({reducer: rootReducer});
export default store;
