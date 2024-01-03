import React, { useState, useEffect } from 'react';

const FlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/flash-cards'); // Replace with the correct path to your JSON file
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {flashcards ? (
        flashcards.map((flashcard) => (
          <div key={flashcard.id} className="flashcard">
            <h3>Question:</h3>
            <p>{flashcard.question}</p>
            <h3>Answer:</h3>
            <p>{flashcard.answer}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FlashCard;