import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './CardCarousel.css';

const CardCarousel = ({ cardData, cardsToShow,content }) => {
  const [startIndex, setStartIndex] = useState(0);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const adjustedCardsToShow = isSmallScreen ? 1 : cardsToShow;

  const goToPrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const goToNext = () => {
    if (startIndex + adjustedCardsToShow < filteredCardData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const filteredCardData = cardData || [];

  return (
    <div className="card-carousel">
      <button className="nav-button prev-button" onClick={goToPrevious} disabled={startIndex === 0}>
        &lt;
      </button>
      <div className="card-container">
        {filteredCardData.slice(startIndex, startIndex + adjustedCardsToShow).map((card, index) => (
          <div key={index} className="card">
            <img src={card.images.jpg.image_url} alt={`Card ${index + startIndex}`} className="card-image" />
            <h5>
              <Link to={`/${content}/${card.mal_id}`} style={{ color: '#f1b452' }}>
                {card.title}
              </Link>
            </h5>
            <div>{card.location}</div>
          </div>
        ))}
      </div>
      <button
        className="nav-button next-button"
        onClick={goToNext}
        disabled={startIndex + adjustedCardsToShow >= filteredCardData.length}
      >
        &gt;
      </button>
    </div>
  );
};

CardCarousel.propTypes = {
  cardData: PropTypes.array.isRequired,
  cardsToShow: PropTypes.number.isRequired,
};

export default CardCarousel;
