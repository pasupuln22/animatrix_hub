// AnimeDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AnimeDetail.css';

const AnimeDetail = () => {
  const [animeData, setAnimeData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
        setAnimeData(response.data.data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!animeData) {
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
    broadcast,
    streaming
  } = animeData;

  return (
    <>
    <h1>{title}</h1>
    <div className="anime-detail-container">
        
      <div className="anime-card">
        <img src={images.jpg.large_image_url} alt={`${title} Poster`} />
        <div className="synopsis">
          <h2>Synopsis</h2>
          <p>{synopsis}</p>
        </div>
      </div>
      <div className="anime-card">
        <div className="anime-info">
          <h2>Information</h2>
          <ul>
            <li>Type: {type}</li>
            <li>Episodes: {episodes}</li>
            <li>Status: {status}</li>
            <li>Aired: {aired.string}</li>
            <li>Premiered: {premiered}</li>
            <li>Source: {source}</li>
            <li>Genres: {genres.map((genre) => genre.name).join(', ')}</li>
            <li>Duration: {duration}</li>
            <li>Rating: {rating}</li>
          </ul>
        </div>
        <div className="anime-stats">
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
      <div className="anime-broadcast">
      <h2 >Broadcast</h2>
      <p>{broadcast.string}</p>
        <h3>
          {streaming.map((stream, index) => (
            <a key={index} href={stream.url} target="_blank" rel="noopener noreferrer">
              {stream.name}
              {index < streaming.length - 1 && ", "}
            </a>
          ))}
        </h3>
    </div>
    </div>
    </>
  );
};

export default AnimeDetail;
