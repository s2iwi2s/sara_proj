import React from 'react';
import './App.css';
import { GlobalVariableProvider } from './providers/GlobalVariableProvider';
import { AuthenticationProvider } from './providers/AuthenticationProvider';

import AppRouting from './AppRouting'

function App() {

  return (
    <div className="App">
      <GlobalVariableProvider>
        <AuthenticationProvider>
          <AppRouting />
        </AuthenticationProvider>
      </GlobalVariableProvider>
    </div >
  );

}

export default App;
