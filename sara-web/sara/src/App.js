import React, { useEffect } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

import store from './api/store'

import AppRouting from './AppRouting'
import { THEME, useTheme } from './api/useTheme'

function App() {
  const useAppTheme = useTheme()
  const theme = createMuiTheme({
    palette: {
      type: useAppTheme.props.darkMode ? THEME.DARK_MODE : THEME.LIGHT_MODE,
    },
  });

  useEffect(() => {
    useAppTheme.initTheme()
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <AppRouting />
        </MuiThemeProvider>
      </Provider>
    </div >
  );

}

export default App;
