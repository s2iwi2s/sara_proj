import React from 'react';
import './App.css';
import { AuthenticationProvider } from './security/AuthenticationProvider';

import AppRouting from './AppRouting'

function App() {

  return (
    <div className="App">
      <AuthenticationProvider>
        <AppRouting />
      </AuthenticationProvider>
    </div >
  );

}

export default App;
