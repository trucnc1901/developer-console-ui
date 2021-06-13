import { colors, createMuiTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white,
    },
    primary: {
      contrastText: '#ffffff',
      main: '#006dff',
    },
    secondary: {
      main: '#ff5630',
    },
    error: {
      main: '#ff5630',
    },
    warning: {
      main: '#ffab00',
    },
    success: {
      main: '#15b34e',
    },
    text: {
      primary: '#142b43',
      secondary: '#6b778c',
      active: '#006dff',
      white: '#ffffff',
    },
    border: '#e7eaec',
  },
  shadows,
  typography,
});

export default theme;
