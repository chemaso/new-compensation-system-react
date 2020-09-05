
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import RoutesGenerator from './router'
import { theme } from './theme'
import './App.css'

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <RoutesGenerator />
    </ThemeProvider>
  </Provider>
  );
}

export default App;
