// Routes.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Anime from '../Pages/Anime/Anime';
import Manga from '../Pages/Manga/Manga';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
