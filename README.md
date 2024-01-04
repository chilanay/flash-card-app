# FlashCard App

Welcome to the FlashCard App! This application allows you to create, edit, and manage flashcards for effective learning.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Setting Up the React App](#setting-up-the-react-app)
  - [Setting Up the JSON-Server](#setting-up-the-json-server)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime.
- [npm](https://www.npmjs.com/) - Package manager for Node.js.

## Getting Started

### Setting Up the React App
1. Run this command in the terminal line (the directory should be where you want the app to be created)
    npx create-react-app flash-card-app

2. Clone the repository to your local machine:
   git clone https://github.com/chilanay/flash-card-app.git

3.  Navigate to the project directory:
    cd flash-card-app

4. Install the required dependencies:
    npm install
    
Setting Up the JSON-Server
    The FlashCard App uses a JSON-Server to simulate a backend for storing flashcard data.

5. Install JSON-Server globally:
    npm install -g json-server

6. Create a db.json file in the root directory of your project with the following content:
    {   
    "flash-cards": []
    }


### Running the Application
1. Start the JSON-Server to simulate the backend:
    json-server --watch db.json --port 5000

This will start the JSON-Server on http://localhost:5000.

2. In a separate terminal, start the React app:
    npm start
The React app will be available at http://localhost:3000.

Usage
    Open your web browser and visit http://localhost:3000 to access the FlashCard App.
    Create, edit, and manage your flashcards using the provided user interface.
    Interact with the app and explore various features.