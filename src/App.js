import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDarkMode } from './DarkModeContext';
import Home from './Pages/Home/Home';
import Anime from './Pages/Anime/Anime';
import Manga from './Pages/Manga/Manga';
import ResponsiveAppBar from './Pages/ResponsiveAppBar/ResponsiveAppBar';
import AnimeDetail from './Pages/AnimeDetail/AnimeDetail';
import ContactUs from './Pages/ContactUs/ContactUs';
import MangaDetail from './Pages/MangaDetail/MangaDetail';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { isDarkMode } = useDarkMode();

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
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/manga/:id" element={<MangaDetail />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
