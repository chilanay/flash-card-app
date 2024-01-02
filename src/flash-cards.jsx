import React, { useState, useEffect } from 'react';

const FlashCard = () => {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    // Fetch data from flash-card.json
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/flash-cards');
        // const response = await fetch('flash-card.json');
        const data = await response.json();
        setFlashCards(data.flashCards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Flash Cards</h1>
      {flashCards.map((card) => (
        <div key={card.id} className="flash-card">
          <div className="front">
            <h3>{card.question}</h3>
            <p>Last Modified: {card.lastModificationDateTime}</p>
          </div>
          <div className="back">
            <p>{card.answer}</p>
            <p>Status: {card.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashCard;
