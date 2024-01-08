// Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCarousel from '../../Reusable/CardCarousel/CardCarousel';
import './Home.css'; // Import the CSS file for the home page

const Home = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setTopAnime(response.data.data);
      } catch (error) {
        console.error('Error fetching top anime:', error);
      }
    };

    const fetchTopManga = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/manga');
        setTopManga(response.data.data);
      } catch (error) {
        console.error('Error fetching top manga:', error);
      }
    };

    // Fetch data for top anime and top manga
    fetchTopAnime();
    fetchTopManga();
  }, []);

  return (
    <div className="container">
      <div className="section">
        <h1>Top 25 Anime Carousel</h1>
        <p>Explore the top 25 anime based on current popularity and ratings. Discover a diverse range of genres and captivating stories.</p>
        <CardCarousel cardData={topAnime} cardsToShow={5} />
        <p>
          <a href="/anime-page">Explore More Anime</a>
        </p>
      </div>

      <div className="section">
        <h1>Top 25 Manga Carousel</h1>
        <p>Delve into the top 25 manga titles, ranging from action-packed adventures to thought-provoking narratives. Find your next captivating read.</p>
        <CardCarousel cardData={topManga} cardsToShow={5} />
        <p>
          <a href="/manga-page">Explore More Manga</a>
        </p>
      </div>
    </div>
  );
};

export default Home;
