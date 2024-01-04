import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './home.jsx'
import FlashCard from './flash-cards.jsx'
import ContactPage from './contact-page.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/flash-cards" element={<FlashCard />} />
          <Route path="/contact-page" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
