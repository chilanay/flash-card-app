import React, { useState, useEffect } from 'react';
import './flash-cards.css';
import './edit-card.css';
import Navbar from './navbar.jsx';
import EditCard from './edit-card.jsx';

const FlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/flash-cards');
        const data = await response.json();

        // Sort the data based on the lastModified date in descending order
        const sortedData = data
          .map((card) => ({ ...card, visibleSide: 'front' }))
          .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

        setFlashcards(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (index) => {
    setFlashcards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, visibleSide: card.visibleSide === 'front' ? 'back' : 'front' } : card
      )
    );
  };

  const handleEditClick = (index) => {
    setEditingCard(index);
  };

  const handleDeleteClick = async (id) => {
    try {
      await fetch(`http://localhost:5000/flash-cards/${id}`, {
        method: 'DELETE',
      });
      setFlashcards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleSaveEdit = async (editedCard) => {
    try {
      // Make PUT request to update the edited card
      const response = await fetch(`http://localhost:5000/flash-cards/${editedCard.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCard),
      });

      if (response.ok) {
        // Update the state with the edited card
        setFlashcards((prevCards) => {
          const updatedCards = prevCards.map((card, i) => (i === editingCard ? editedCard : card));

          // Sort the updated array based on the lastModified date in descending order
          const sortedUpdatedCards = updatedCards.sort(
            (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
          );

          return sortedUpdatedCards;
        });

        setEditingCard(null);
      } else {
        console.error('Error updating card:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
  };

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleHideCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleCreateCard = async (newCard) => {
    try {
      // Make POST request to create a new card
      const response = await fetch('http://localhost:5000/flash-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        const createdCard = await response.json();

        // Update the state with the newly created card at the top
        setFlashcards((prevCards) => [
          { ...createdCard, visibleSide: 'front' },
          ...prevCards,
        ]);

        setShowCreateForm(false);
      } else {
        console.error('Error creating card:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleSearch = () => {
    // Filter flashcards based on search term and status filter
    const filteredResults = flashcards.filter((card) => {
      const { question, answer, lastModified, status } = card;
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      const normalizedStatusFilter = statusFilter.toLowerCase().trim();

      const matchSearchTerm =
        question.toLowerCase().includes(normalizedSearchTerm) ||
        answer.toLowerCase().includes(normalizedSearchTerm) ||
        lastModified.toLowerCase().includes(normalizedSearchTerm);

      const matchStatusFilter =
        statusFilter === '' ||
        (normalizedStatusFilter === 'wanttolearn' && status.toLowerCase().includes('want to learn')) ||
        status.toLowerCase().includes(normalizedStatusFilter);

      return matchSearchTerm && matchStatusFilter;
    });

    // Update the visibleSide property in the filteredResults based on the existing state
    const resultsWithVisibleSide = filteredResults.map((card) => {
      const existingCard = flashcards.find((c) => c.id === card.id);
      return { ...card, visibleSide: existingCard ? existingCard.visibleSide : 'front' };
    });

    // Sort the filtered results based on the selected sort option
    const sortedResults = sortFlashcards(resultsWithVisibleSide, sortOption);

    // Update the state with the sorted and filtered results
    setSearchResults(sortedResults);
  };

  const handleSort = (option) => {
    setSortOption(option);
    handleSearch();
  };

  const sortFlashcards = (cards, option) => {
    switch (option) {
      case 'date':
        return cards.slice().sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

      case 'question':
        return cards.slice().sort((a, b) => a.question.localeCompare(b.question));

      default:
        return cards;
    }
  };

  return (
    <>
      <Navbar />

      <div className="flashcard-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="status-filter-container">
          <label htmlFor="status-filter">Filter:</label>
          <select
            id="status-filter"
            onChange={(e) => { setStatusFilter(e.target.value); }}
            value={statusFilter}
          >
            <option value="">All</option>
            <option value="noted">Noted</option>
            <option value="learned">Learned</option>
            <option value="wanttolearn">Want to Learn</option>
          </select>
          <button className="filter-button" onClick={handleSearch}>
            Filter
          </button>
        </div>

        <div className="sort-options-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            onChange={(e) => handleSort(e.target.value)}
            value={sortOption}
          >
            <option value="default">Default</option>
            <option value="date">Date</option>
            <option value="question">Question</option>
          </select>
          <button className="sort-button" onClick={handleSearch}>
            Sort
          </button>
        </div>

        <div className="create-button-container">
          <button onClick={handleShowCreateForm}>Create New Flashcard</button>
        </div>

        {showCreateForm && (
          <EditCard
            flashcard={{
              question: '',
              answer: '',
              status: '',
              lastModified: '',
            }}
            onSave={handleCreateCard}
            onCancel={handleHideCreateForm}
          />
        )}

        {searchResults.length > 0 ? (
          searchResults.map((flashcard, index) => (
            <div key={flashcard.id} className="flashcard" onClick={() => handleCardClick(index)}>
              <div className="card">
                {editingCard === index ? (
                  <EditCard
                    flashcard={flashcard}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>
                    {flashcard.visibleSide === 'front' ? (
                      <>
                        <div className="question">
                          <h3>Question:</h3>
                          <p>{flashcard.question}</p>
                        </div>
                        <div className="metadata">
                          <p>Last Modified: {flashcard.lastModified}</p>
                          <p>Status: {flashcard.status}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="answer">
                          <h3>Answer:</h3>
                          <p>{flashcard.answer}</p>
                        </div>
                        <div className="metadata">
                          <p>Last Modified: {flashcard.lastModified}</p>
                          <p>Status: {flashcard.status}</p>
                        </div>
                      </>
                    )}
                    <div className="buttons-container">
                      <div className="buttons">
                        <button onClick={() => handleEditClick(index)}>Edit</button>
                        <button onClick={() => handleDeleteClick(flashcard.id)}>Delete</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          flashcards.map((flashcard, index) => (
            <div key={flashcard.id} className="flashcard" onClick={() => handleCardClick(index)}>
              <div className="card">
                {editingCard === index ? (
                  <EditCard
                    flashcard={flashcard}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>
                    {flashcard.visibleSide === 'front' ? (
                      <>
                        <div className="question">
                          <h3>Question:</h3>
                          <p>{flashcard.question}</p>
                        </div>
                        <div className="metadata">
                          <p>Last Modified: {flashcard.lastModified}</p>
                          <p>Status: {flashcard.status}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="answer">
                          <h3>Answer:</h3>
                          <p>{flashcard.answer}</p>
                        </div>
                        <div className="metadata">
                          <p>Last Modified: {flashcard.lastModified}</p>
                          <p>Status: {flashcard.status}</p>
                        </div>
                      </>
                    )}
                    <div className="buttons-container">
                      <div className="buttons">
                        <button onClick={() => handleEditClick(index)}>Edit</button>
                        <button onClick={() => handleDeleteClick(flashcard.id)}>Delete</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FlashCard;