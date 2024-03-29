import { createTheme } from '@mui/material/styles';
import { red, deepOrange, amber, grey, blueGrey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

const modeSwitcher = (mode: string) => {
  if (mode === 'light') {
    return {
      // palette values for light mode
      primary: blueGrey,
      divider: blueGrey[200],
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
    primary: blueGrey,
    divider: blueGrey[200],
    text: {
      primary: blueGrey[900],
      secondary: grey[800],
    },
  };
};

export const getDesignTokens = (mode: PaletteMode) => ({
  breakPoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
        h1: {
          fontWeight: '800',
          fontSize: 'clamp(14vw, 6em, 30vw)',
        },
        h2: {
          fontSize: 'clamp(3vw, 3em, 3em)',
        },
      },
    },
  },
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
