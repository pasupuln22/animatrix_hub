import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manga.css'; // Adjust the path accordingly
import ActionAreaCard from '../../Reusable/ActionAreaCard/ActionAreaCard';
import Pagination from '../../Reusable/Pagination/Pagination';

export default function Manga() {
  const [animeData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/manga?page=${currentPage}`);
        setAnimeData(response.data.data);
        setTotalPages(response.data.pagination.last_visible_page);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="anime">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <div className="anime" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {animeData.map((anime) => (
          <ActionAreaCard
            key={anime.mal_id}
            image={anime.images.jpg.image_url}
            title={anime.title}
            description={anime.synopsis}
          />
        ))}
      </div>
    </div>
  );
}
