import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ActionAreaCard from '../../Reusable/ActionAreaCard/ActionAreaCard';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Manga.css';
import { URL } from '../../Utils/Url';

export default function Manga() {
  const [mangaData, setMangaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rateLimitError, setRateLimitError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/manga?page=${currentPage}`);
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

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${URL}/manga?q=${searchQuery}`);
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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    handleSearch();
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
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Button type="submit" variant="contained" style={{ marginLeft: '10px', marginTop: '7px' }}>
          Search
        </Button>
      </form>
      <div className="manga" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {mangaData.map((manga) => (
          <ActionAreaCard
            key={manga.mal_id}
            page="manga"
            mal_id={manga.mal_id}
            image={manga.images.jpg.image_url}
            title={manga.title}
            genres={manga.genres}
            scores={manga.score}
          />
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}
