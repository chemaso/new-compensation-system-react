import { createMuiTheme } from '@material-ui/core/styles'

const fonts = "'Lato', 'Rubik', sans-serif";

export const theme = createMuiTheme({
  typography: {
    fontFamily: fonts,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '2px',
          height: '2px',
        },
        '*::-webkit-scrollbar-button': {
          width: '0px',
          height: '0px'
        },
        '*::-webkit-scrollbar-thumb': {
          background: '#e1e1e1',
          border: '0px none #ffffff',
          borderRadius: '50px'
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: '#ffffff'
        },
        '*::-webkit-scrollbar-thumb:active': {
          background: '#000000'
        },
        '*::-webkit-scrollbar-track': {
          background: '#666666',
          border: '0px none #ffffff',
          borderRadius: '50px'
        },
        '*::-webkit-scrollbar-track:hover': {
          background: '#666666',
        },
        '*::-webkit-scrollbar-track:active': {
          background: '#333333',
        },
        '*::-webkit-scrollbar-corner': {
          background: 'transparent',
        },
      }
    },
  },
});
