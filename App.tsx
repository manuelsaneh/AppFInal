import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Navigation';
import {store} from './src/utils/redux/store/store';
import RNSecureStorage from 'rn-secure-storage';
import {setToken} from './src/utils/redux/slices/authSlice';

function App(): React.JSX.Element {
  useEffect(() => {
    RNSecureStorage.getItem('token').then(token => {
      store.dispatch(setToken(token));
    });
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
