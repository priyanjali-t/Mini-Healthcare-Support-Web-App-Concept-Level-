import React from 'react';

/**
 * AdminPanel component for healthcare staff to view submitted requests
 * This component simulates the admin side of the application
 */
const AdminPanel = ({ submissions }) => {
  // Render the admin panel to view all submissions
  return (
    <div className="admin-panel">
      <h3>Hospital Staff Panel</h3>
      <p className="admin-info">Requests submitted by patients and volunteers for review</p>
      
      {submissions.length === 0 ? (
        <div className="no-submissions">
          <p>No requests submitted yet. Check back later for new submissions.</p>
        </div>
      ) : (
        <div className="submissions-list">
          <h4>Recent Requests ({submissions.length})</h4>
          <div className="submissions-container">
            {submissions.map((submission, index) => (
              <div key={submission.timestamp || index} className="submission-card">
                <div className="submission-header">
                  <span className="submission-name">{submission.fullName}</span>
                  <span className="submission-date">{new Date(submission.timestamp).toLocaleString()}</span>
                </div>
                <div className="submission-details">
                  <div className="detail-row">
                    <strong>Type:</strong> <span>{submission.supportType}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Category:</strong> <span>{submission.category}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Email:</strong> <span>{submission.email}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Priority:</strong> <span className={`priority-${submission.priority.toLowerCase()}`}>{submission.priority}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Summary:</strong> <span>{submission.message.substring(0, 100)}{submission.message.length > 100 ? '...' : ''}</span>
                  </div>
                  <div className="detail-row">
                    <strong>AI Analysis:</strong> <span>{submission.aiAnalysis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;