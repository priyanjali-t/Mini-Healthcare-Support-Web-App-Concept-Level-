import React, { useState } from 'react';

// HealthcareSupportForm component handles user requests for healthcare support
const HealthcareSupportForm = ({ onSubmission }) => {
  // Initial form state
  const initialFormData = {
    fullName: '',
    email: '',
    supportType: 'Medical Help',
    message: ''
  };

  // State for form inputs
  const [formData, setFormData] = useState(initialFormData);

  // State for submission summary
  const [summary, setSummary] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Validate form data before processing
      if (!validateFormData(formData)) {
        console.error('Invalid form data');
        return;
      }
      
      // Generate AI-like summary of the submission
      const aiSummary = generateAISummary(formData);
      
      // Set the summary to display
      setSummary(aiSummary);
      
      // Call the submission handler to simulate storing on admin side
      if (onSubmission) {
        onSubmission(aiSummary);
      }
      
      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error processing form:', error);
    }
  };

  // Validate form data
  const validateFormData = (data) => {
    return data.fullName.trim() !== '' && 
           data.email.trim() !== '' && 
           data.supportType.trim() !== '' && 
           data.message.trim() !== '' &&
           isValidEmail(data.email);
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to generate AI-like summary
  const generateAISummary = (data) => {
    // Define support type details
    const supportTypeDetails = {
      'Medical Help': {
        description: 'Request for medical consultation or treatment assistance',
        priority: 'Medium',
        category: 'Healthcare'
      },
      'Medicine Donation': {
        description: 'Donation of medicines or medical supplies',
        priority: 'Low',
        category: 'Resources'
      },
      'Volunteer Support': {
        description: 'Offering time and services as a volunteer',
        priority: 'High',
        category: 'Human Resources'
      }
    };

    // Get support info based on selected type
    const supportInfo = supportTypeDetails[data.supportType] || {
      description: 'General support request',
      priority: 'Medium',
      category: 'General'
    };
    
    // Generate a structured summary
    return {
      timestamp: new Date().toLocaleString(),
      fullName: data.fullName,
      email: data.email,
      supportType: data.supportType,
      supportDescription: supportInfo.description,
      priority: supportInfo.priority,
      category: supportInfo.category,
      message: data.message,
      aiAnalysis: generateAIAnalysis(data)
    };
  };

  // Function to generate AI analysis of the message
  const generateAIAnalysis = (data) => {
    let analysis = [];
    
    // Analyze message length and content
    const messageLength = data.message.length;
    if (messageLength > 200) {
      analysis.push('Detailed request received');
    } else if (messageLength < 50) {
      analysis.push('Brief request received');
    } else {
      analysis.push('Standard request received');
    }
    
    // Analyze support type urgency
    if (data.supportType === 'Medical Help') {
      analysis.push('Requires medical attention');
    } else if (data.supportType === 'Volunteer Support') {
      analysis.push('Valuable volunteer offer');
    } else {
      analysis.push('Resource donation opportunity');
    }
    
    // Analyze contact information validity
    if (isValidEmail(data.email)) {
      analysis.push('Valid contact information provided');
    } else {
      analysis.push('Contact information invalid');
    }
    
    // Analyze message sentiment
    const sentiment = analyzeSentiment(data.message);
    analysis.push(`Message sentiment: ${sentiment}`);
    
    return analysis.join('. ') + '.';
  };

  // Analyze message sentiment
  const analyzeSentiment = (message) => {
    const positiveWords = ['thank', 'good', 'great', 'helpful', 'appreciate', 'please', 'hope'];
    const negativeWords = ['urgent', 'emergency', 'critical', 'bad', 'terrible', 'problem', 'issue'];
    
    const lowerMessage = message.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (lowerMessage.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (lowerMessage.includes(word)) negativeCount++;
    });
    
    if (negativeCount > positiveCount) return 'Concerned/Urgent';
    if (positiveCount > negativeCount) return 'Positive/Hopeful';
    return 'Neutral';
  };

  return (
    <div className="form-container">
      <h2>Request Healthcare Support</h2>
      <form onSubmit={handleSubmit} className="support-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="supportType">Support Type:</label>
          <select
            id="supportType"
            name="supportType"
            value={formData.supportType}
            onChange={handleChange}
            required
          >
            <option value="Medical Help">Medical Help</option>
            <option value="Medicine Donation">Medicine Donation</option>
            <option value="Volunteer Support">Volunteer Support</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your request or offer in detail"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
      
      {/* Display AI-generated analysis if available */}
      {summary && (
        <div className="summary-card">
          <h3>AI Analysis Report</h3>
          <div className="summary-content">
            <div className="summary-item">
              <strong>AI Analysis:</strong> {summary.aiAnalysis}
            </div>
            <div className="summary-item">
              <small>Generated on: {summary.timestamp}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthcareSupportForm;