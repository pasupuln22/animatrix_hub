import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCarousel from '../../Reusable/CardCarousel/CardCarousel';

const Home = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setCardData(response.data.data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Top Anime Carousel</h1>
      {/* Use the CardCarousel component and pass the cardData */}
      <CardCarousel cardData={cardData} cardsToShow={5} />
    </div>
  );
};

export default Home;
