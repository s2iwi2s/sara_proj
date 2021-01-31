import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GlobalVariableProvider } from './providers/GlobalVariableProvider';

ReactDOM.render(
  <React.StrictMode>
    <GlobalVariableProvider>
      <App />
    </GlobalVariableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
