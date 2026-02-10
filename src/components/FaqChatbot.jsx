import React, { useState } from 'react';

/**
 * FaqChatbot component for answering frequently asked questions
 * Represents a concept-level AI chatbot for healthcare support
 */
const FaqChatbot = ({ onClose }) => {
  // Initial state for chat messages and user input
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your healthcare support assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Predefined FAQ responses
  const faqResponses = [
    {
      keywords: ['medical help', 'doctor', 'treatment', 'medicine', 'health'],
      response: "To get medical help, please fill out our support form with your details. Our medical professionals will review your request and connect with you shortly."
    },
    {
      keywords: ['volunteer', 'help', 'assist', 'contribute', 'support'],
      response: "We welcome volunteers! You can offer your time and skills in various ways. Please fill out the Volunteer Support option in our form to express interest."
    },
    {
      keywords: ['free', 'cost', 'charge', 'payment', 'money'],
      response: "Yes, our healthcare services are completely free. We operate solely on donations and grants to support our mission."
    },
    {
      keywords: ['time', 'long', 'wait', 'duration', 'response'],
      response: "Response times vary depending on the urgency of your request. Typically, we aim to respond within 24-48 hours during business days."
    },
    {
      keywords: ['donation', 'give', 'gift', 'contribute'],
      response: "Thank you for considering a donation! You can donate medicines or funds through our form. All donations are tax-deductible and directly support our healthcare programs."
    },
    {
      keywords: ['contact', 'phone', 'address', 'location'],
      response: "For urgent matters, please call our helpline at +1-800-HELP-NOW. You can also reach us through this portal or visit our center at Healthcare Avenue, City."
    },
    {
      keywords: ['emergency', 'urgent', 'crisis', 'immediate'],
      response: "For medical emergencies, please call 911 or your local emergency number. For non-emergency health support, our team will assist you within 24 hours."
    }
  ];

  // Function to process user input and generate bot response
  const processUserInput = (userInput) => {
    // Convert input to lowercase for matching
    const lowerInput = userInput.toLowerCase();
    
    // Look for keyword matches in FAQs
    for (const faq of faqResponses) {
      for (const keyword of faq.keywords) {
        if (lowerInput.includes(keyword)) {
          return faq.response;
        }
      }
    }
    
    // Return fallback response if no match found
    return "Our team will get back to you soon. Meanwhile, please check our website for more information or fill out the support form for immediate assistance.";
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    // Add user message to chat
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Process and generate bot response after a short delay
    setTimeout(() => {
      const botResponse = processUserInput(inputValue);
      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 500); // Simulate typing delay
    
    // Clear input field
    setInputValue('');
  };

  return (
    <div className="faq-chatbot">
      <div className="chat-header">
        <h3>Healthcare Support Assistant</h3>
        <button className="close-button" onClick={onClose} aria-label="Close chatbot">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender}-message`}
            >
              {message.text}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about healthcare support..."
            className="chat-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default FaqChatbot;