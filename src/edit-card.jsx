import React, { useState } from 'react';
import './edit-card.css';

const EditCard = ({ flashcard, onSave, onCancel }) => {
  const [editedQuestion, setEditedQuestion] = useState(flashcard.question);
  const [editedAnswer, setEditedAnswer] = useState(flashcard.answer);
  const [editedStatus, setEditedStatus] = useState(flashcard.status);

  const handleSave = () => {
    onSave({
      ...flashcard,
      question: editedQuestion,
      answer: editedAnswer,
      status: editedStatus,
      lastModified: new Date().toLocaleString(),
    });
  };

  return (
    <div className="edit-popup">
      <div className="edit-container">
        <h2>Edit Card</h2>
        <label>
          Question:
          <textarea
            rows="4"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
          />
        </label>
        <label>
          Answer:
          <textarea
            rows="4"
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          />
        </label>
        <div className="edit-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;