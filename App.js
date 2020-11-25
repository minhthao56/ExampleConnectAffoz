import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Routers from './src/router';

const App = () => {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
};

export default App;
