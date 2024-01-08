import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ActionAreaCard from '../../Reusable/ActionAreaCard/ActionAreaCard';
import Pagination from '../../Reusable/Pagination/Pagination';
import './Manga.css';

export default function Manga() {
  const [mangaData, setMangaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rateLimitError, setRateLimitError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/manga?page=${currentPage}`);
        setMangaData(response.data.data);
        setTotalPages(response.data.pagination.last_visible_page);
        // Reset rate limit error state on successful request
        setRateLimitError(false);
      } catch (error) {
        console.error('Error fetching manga data:', error);
        if (error.response && error.response.status === 429) {
          // Set rate limit error state if status code is 429
          setRateLimitError(true);
        }
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (

    <div className="manga">
      <Stack sx={{ width: '100%' }} spacing={2}>
        {rateLimitError && (
          <Alert variant="filled" severity="error">
            You are being rate-limited. Please follow Rate Limiting guidelines:
            <a href="https://docs.api.jikan.moe/#section/Information/Rate-Limiting" target="_blank" rel="noopener noreferrer">
              Rate Limiting Guidelines
            </a>
          </Alert>
        )}
      </Stack>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <div className="manga" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {mangaData.map((manga) => (
          <ActionAreaCard
            key={manga.mal_id}
            image={manga.images.jpg.image_url}
            title={manga.title}
            description={manga.synopsis}
          />
        ))}
      </div>
    </div>

  );
}
