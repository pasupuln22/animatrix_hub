import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCarousel from '../../Reusable/CardCarousel/CardCarousel';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import './Home.css';

const Home = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [rateLimitError, setRateLimitError] = useState(false);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setTopAnime(response.data.data);
      } catch (error) {
        console.error('Error fetching top anime:', error);
        if (error.response && error.response.status === 429) {
          // Set rate limit error state if status code is 429
          setRateLimitError(true);
        }
      }
    };

    const fetchTopManga = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/manga');
        setTopManga(response.data.data);
      } catch (error) {
        console.error('Error fetching top manga:', error);
        if (error.response && error.response.status === 429) {
          // Set rate limit error state if status code is 429
          setRateLimitError(true);
        }
      }
    };

    fetchTopAnime();
    fetchTopManga();
  }, []);

  return (
    <div className="container">
      <Stack sx={{ width: '100%' }} spacing={2}>
        {rateLimitError && (
          <Alert variant="filled" severity="error">
            You are being rate-limited. Please follow Rate Limiting guidelines: 
            <a href="https://docs.api.jikan.moe/#section/Information/Rate-Limiting" target="_blank" rel="noopener noreferrer">
              Rate Limiting Guidelines
            </a>
          </Alert>
        )}

        <div className="section">
          <h1>Top 25 Anime Carousel</h1>
          <p>Explore the top 25 anime based on current popularity and ratings. Discover a diverse range of genres and captivating stories.</p>
          <CardCarousel cardData={topAnime} cardsToShow={5} content="anime"/>
          <p>
            <a href="/anime">Explore More Anime</a>
          </p>
        </div>

        <div className="section">
          <h1>Top 25 Manga Carousel</h1>
          <p>Delve into the top 25 manga titles, ranging from action-packed adventures to thought-provoking narratives. Find your next captivating read.</p>
          <CardCarousel cardData={topManga} cardsToShow={5} content="manga"/>
          <p>
            <a href="/manga">Explore More Manga</a>
          </p>
        </div>
      </Stack>
    </div>
  );
};

export default Home;
