import React, { useState, useEffect } from 'react';

// Import CSS files for styling
import './flash-cards.css';
import './edit-card.css';

// Import the Navbar and EditCard components
import Navbar from './navbar.jsx';
import EditCard from './edit-card.jsx';

// Define the FlashCard functional component
const FlashCard = () => {
  // State variables using the useState hook
  const [flashcards, setFlashcards] = useState([]); // Store flashcards data
  const [editingCard, setEditingCard] = useState(null); // Track the index of the card being edited
  const [showCreateForm, setShowCreateForm] = useState(false); // Toggle display of the create card form
  const [searchTerm, setSearchTerm] = useState(''); // Store the search term for filtering
  const [searchResults, setSearchResults] = useState([]); // Store filtered search results
  const [statusFilter, setStatusFilter] = useState(''); // Store the selected status filter
  const [sortOption, setSortOption] = useState('default'); // Store the selected sorting option

  // useEffect hook to fetch data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to fetch flashcards data from the server
        const response = await fetch('http://localhost:5000/flash-cards');
        const data = await response.json();

        // Sort the data based on the lastModified date in descending order
        const sortedData = data
          .map((card) => ({ ...card, visibleSide: 'front' }))
          .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

        // Update the state with the sorted flashcards data
        setFlashcards(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Function to handle click events on flashcards to toggle visible side (front/back)
  const handleCardClick = (index) => {
    setFlashcards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, visibleSide: card.visibleSide === 'front' ? 'back' : 'front' } : card
      )
    );
  };

  // Function to handle click events on the "Edit" button of a flashcard
  const handleEditClick = (index) => {
    setEditingCard(index);
  };

  // Function to handle click events on the "Delete" button of a flashcard
  const handleDeleteClick = async (id) => {
    try {
      // Make a DELETE request to delete the selected flashcard from the server
      await fetch(`http://localhost:5000/flash-cards/${id}`, {
        method: 'DELETE',
      });

      // Update the state by removing the deleted card
      setFlashcards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  // Function to handle saving edits to a flashcard
  const handleSaveEdit = async (editedCard) => {
    try {
      // Make a PUT request to update the edited flashcard on the server
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

        // Reset the editingCard state to null
        setEditingCard(null);
      } else {
        console.error('Error updating card:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  // Function to handle canceling the edit mode
  const handleCancelEdit = () => {
    setEditingCard(null);
  };

  // Function to show the create card form
  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  // Function to hide the create card form
  const handleHideCreateForm = () => {
    setShowCreateForm(false);
  };

  // Function to handle creating a new flashcard
  const handleCreateCard = async (newCard) => {
    try {
      // Make a POST request to create a new flashcard on the server
      const response = await fetch('http://localhost:5000/flash-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        // Get the newly created card from the server response
        const createdCard = await response.json();

        // Update the state with the newly created card at the top
        setFlashcards((prevCards) => [
          { ...createdCard, visibleSide: 'front' },
          ...prevCards,
        ]);

        // Hide the create card form
        setShowCreateForm(false);
      } else {
        console.error('Error creating card:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  // Function to handle search based on the current search term and status filter
  const handleSearch = () => {
    // Filter flashcards based on search term and status filter
    const filteredResults = flashcards.filter((card) => {
      const { question, answer, lastModified, status } = card;
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      const normalizedStatusFilter = statusFilter.toLowerCase().trim();

      // Check if the card matches the search term and status filter
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

  // Function to handle sorting flashcards based on the selected option
  const handleSort = (option) => {
    setSortOption(option);
    handleSearch();
  };

  // Function to sort flashcards based on the selected option
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

  // JSX structure for rendering the FlashCard component
  return (
    <>
      {/* Render the Navbar component */}
      <Navbar />

      {/* Flashcard container with search, filter, sort, and create card functionality */}
      <div className="flashcard-container">
        {/* Search input and button */}
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

        {/* Status filter dropdown and button */}
        <div className="status-filter-container">
          <label htmlFor="status-filter">Filter:</label>
          <select
            id="status-filter"
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
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

        {/* Sort options dropdown and button */}
        <div className="sort-options-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" onChange={(e) => handleSort(e.target.value)} value={sortOption}>
            <option value="default">Default</option>
            <option value="date">Date</option>
            <option value="question">Question</option>
          </select>
          <button className="sort-button" onClick={handleSearch}>
            Sort
          </button>
        </div>

        {/* Create new flashcard button */}
        <div className="create-button-container">
          <button onClick={handleShowCreateForm}>Create New Flashcard</button>
        </div>

        {/* Create card form */}
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

        {/* Display flashcards or search results */}
        {searchResults.length > 0 ? (
          // Render search results
          searchResults.map((flashcard, index) => (
            <div key={flashcard.id} className="flashcard" onClick={() => handleCardClick(index)}>
              <div className="card">
                {editingCard === index ? (
                  // Render edit form if editingCard state matches the current index
                  <EditCard
                    flashcard={flashcard}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  // Render flashcard details if not in edit mode
                  <>
                    {flashcard.visibleSide === 'front' ? (
                      // Render question side
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
                      // Render answer side
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
                    {/* Buttons for Edit and Delete actions */}
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
          // Render all flashcards if no search results
          flashcards.map((flashcard, index) => (
            <div key={flashcard.id} className="flashcard" onClick={() => handleCardClick(index)}>
              <div className="card">
                {editingCard === index ? (
                  // Render edit form if editingCard state matches the current index
                  <EditCard
                    flashcard={flashcard}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  // Render flashcard details if not in edit mode
                  <>
                    {flashcard.visibleSide === 'front' ? (
                      // Render question side
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
                      // Render answer side
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
                    {/* Buttons for Edit and Delete actions */}
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

// Export the FlashCard component as the default export
export default FlashCard;
