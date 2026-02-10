// Entry point for the Healthcare Support System application
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

// Get the root element from the HTML document
const container = document.getElementById('root');

// Create a root for React rendering
const root = ReactDOM.createRoot(container);

// Render the application inside React StrictMode for development best practices
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);