import React, { useState } from 'react';
import './edit-card.css';

// EditCard Component: Allows editing of flashcard details
const EditCard = ({ flashcard, onSave, onCancel }) => {
  // State for edited question, answer, and status
  const [editedQuestion, setEditedQuestion] = useState(flashcard.question);
  const [editedAnswer, setEditedAnswer] = useState(flashcard.answer);
  const [editedStatus, setEditedStatus] = useState(flashcard.status);

  // Handler for saving changes
  const handleSave = () => {
    // Call onSave prop with updated flashcard details
    onSave({
      ...flashcard,
      question: editedQuestion,
      answer: editedAnswer,
      status: editedStatus,
      lastModified: new Date().toLocaleString(),
    });
  };

  // JSX for rendering the component
  return (
    <div className="edit-popup">
      <div className="edit-container">
        <h2>Edit Card</h2>
        {/* Input for editing the question */}
        <label>
          Question:
          <textarea
            rows="4"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
          />
        </label>
        {/* Input for editing the answer */}
        <label>
          Answer:
          <textarea
            rows="4"
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
          />
        </label>
        {/* Input for editing the status */}
        <label>
          Status:
          <input
            type="text"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          />
        </label>
        {/* Buttons for saving and canceling changes */}
        <div className="edit-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
