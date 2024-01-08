// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDarkMode } from './DarkModeContext';
import Home from './Pages/Home/Home';
import Anime from './Pages/Anime/Anime';
import Manga from './Pages/Manga/Manga';
import ResponsiveAppBar from './Pages/ResponsiveAppBar/ResponsiveAppBar';

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />
        </Routes>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
