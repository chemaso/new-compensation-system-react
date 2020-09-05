import { createMuiTheme } from '@material-ui/core/styles'

const fonts = "'Lato', 'Rubik', sans-serif";

export const theme = createMuiTheme({
  typography: {
    fontFamily: fonts,
  },
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #f7aa37 30%, #ff600d 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white !important',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    }
  }
});