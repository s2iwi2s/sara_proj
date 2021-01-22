import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { GlobalVariableProvider } from './providers/GlobalVariableProvider';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import store from './api/store';

import AppRouting from './AppRouting'

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <GlobalVariableProvider>
          <AuthenticationProvider>
            <AppRouting />
          </AuthenticationProvider>
        </GlobalVariableProvider>
      </Provider>
    </div >
  );

}

export default App;
