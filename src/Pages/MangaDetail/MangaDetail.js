// MangaDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MangaDetail.css';

const MangaDetail = () => {
  const [mangaData, setMangaData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}/full`);
        setMangaData(response.data.data);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!mangaData) {
    return <p>Loading...</p>;
  }

  const {
    title,
    synopsis,
    images,
    type,
    episodes,
    status,
    aired,
    premiered,
    source,
    genres,
    duration,
    rating,
    score,
    scored_by,
    rank,
    popularity,
    members,
    favorites,
  } = mangaData;

  return (
    <>
      <h1>{title}</h1>
      <div className="manga-detail-container">
        <div className="manga-card">
          <img src={images.jpg.large_image_url} alt={`${title} Poster`} />
          <div className="synopsis">
            <h2>Synopsis</h2>
            <p>{synopsis}</p>
          </div>
        </div>
        <div className="manga-card">
          <div className="manga-info">
            <h2>Information</h2>
            <ul>
              <li>Type: {type}</li>
              <li>Episodes: {episodes}</li>
              <li>Status: {status}</li>
              <li>Aired: {aired?.string}</li>
              <li>Premiered: {premiered}</li>
              <li>Source: {source}</li>
              <li>Genres: {genres.map((genre) => genre.name).join(', ')}</li>
              <li>Duration: {duration}</li>
              <li>Rating: {rating}</li>
            </ul>
          </div>
          <div className="manga-stats">
            <h2>Statistics</h2>
            <ul>
              <li>Score: {score} (scored by {scored_by} users)</li>
              <li>Ranked: #{rank}</li>
              <li>Popularity: #{popularity}</li>
              <li>Members: {members}</li>
              <li>Favorites: {favorites}</li>
            </ul>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default MangaDetail;
