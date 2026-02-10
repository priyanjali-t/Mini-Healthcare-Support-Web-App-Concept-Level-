import React, { useState } from 'react';
import HealthcareSupportForm from './components/HealthcareSupportForm';
import FaqChatbot from './components/FaqChatbot';
import ChatbotToggleIcon from './components/ChatbotToggleIcon';
import AdminPanel from './components/AdminPanel';
import './styles.css';

/**
 * Main App component for the Healthcare Support System
 * This serves as the entry point for the NGO healthcare support application
 */
function App() {
  // State to manage chatbot visibility
  const [chatbotOpen, setChatbotOpen] = useState(false);
  
  // State to manage form submissions (simulated admin-side storage)
  const [submissions, setSubmissions] = useState([]);
  
  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };
  
  // Function to close chatbot
  const closeChatbot = () => {
    setChatbotOpen(false);
  };
  
  // Function to add a new submission to the admin storage
  const handleNewSubmission = (submissionData) => {
    // Add timestamp to the submission
    const submissionWithTimestamp = {
      ...submissionData,
      timestamp: Date.now()
    };
    
    // Add the submission to the admin storage
    setSubmissions(prevSubmissions => [submissionWithTimestamp, ...prevSubmissions]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Healthcare Support System</h1>
        <p>NGO Support Portal - Connect with our community for healthcare assistance</p>
      </header>
      <main>
        <div className="main-content">
          <HealthcareSupportForm onSubmission={handleNewSubmission} />
          <AdminPanel submissions={submissions} />
        </div>
      </main>
      
      {/* Chatbot components */}
      {chatbotOpen || <ChatbotToggleIcon onClick={toggleChatbot} />}
      {chatbotOpen && <FaqChatbot onClose={closeChatbot} />}
      
      <footer className="app-footer">
        <p>© 2026 Healthcare Support NGO | Serving communities with care</p>
      </footer>
    </div>
  );
}

export default App;