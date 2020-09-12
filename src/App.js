
import React from 'react'
import { Provider } from 'react-redux'
import configStore from './store'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import RoutesGenerator from './router'
import { PersistGate } from 'redux-persist/integration/react'
import { PersistorContext } from './context/persistorContext'
import { theme } from './theme'
import './App.css'

function App() {
  const { store, persistor } = configStore()
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div />}
        persistor={persistor}>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <PersistorContext.Provider value={persistor}>
            <RoutesGenerator />
          </PersistorContext.Provider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
