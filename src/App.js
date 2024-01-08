import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './Routes/Routes';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDarkMode } from './DarkModeContext';
import './GlobalColor.css'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode || prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode, prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
      <IconButton onClick={toggleDarkMode} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </ThemeProvider>
  );
}

export default App;
