import { createTheme } from '@mui/material/styles';
import { red, deepOrange, amber, grey, blueGrey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

const modeSwitcher = (mode: string) => {
  if (mode === 'light') {
    return {
      // palette values for light mode
      primary: amber,
      divider: amber[200],
      text: {
        primary: blueGrey[900],
        secondary: grey[800],
      },
    };
  }
  if (mode === 'dark') {
    return {
      // palette values for dark mode
      primary: blueGrey,
      divider: blueGrey[700],
      background: {
        default: blueGrey[900],
        paper: blueGrey[900],
      },
      text: {
        primary: '#fff',
        secondary: grey[500],
      },
    };
  }
  return {
    // palette values for default mode
    primary: amber,
    divider: amber[200],
    text: {
      primary: blueGrey[900],
      secondary: grey[800],
    },
  };
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...modeSwitcher(mode),
  },
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
