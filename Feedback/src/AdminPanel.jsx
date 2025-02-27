import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPanel.css';

const API_URL = 'http://localhost:5000/api';

const AdminPanel = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/feedback`);
      
      if (response.data.success) {
        setFeedbackData(response.data.data);
      } else {
        setError('Failed to load feedback data');
      }
    } catch (err) {
      console.error('Error fetching feedback data:', err);
      setError('Error loading feedback data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`star ${star <= rating ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading feedback data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-outline-danger ms-3"
            onClick={fetchFeedbackData}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 admin-container">
      <div className="admin-header">
        <h1>Tata Motors Grihini Shop Feedback Data</h1>
        <button 
          className="btn btn-primary refresh-btn"
          onClick={fetchFeedbackData}
        >
          Refresh Data
        </button>
      </div>
      
      {feedbackData.length === 0 ? (
        <div className="alert alert-info mt-4">
          No feedback data available yet.
        </div>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Ticket Number</th>
                <th>Product Quality</th>
                <th>Product Packaging</th>
                <th>Customer Service</th>
                <th>Comments</th>
                <th>Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback['Full Name']}</td>
                  <td>{feedback['Phone Number']}</td>
                  <td>{feedback['Ticket Number']}</td>
                  <td>
                    {renderRatingStars(feedback['Product Quality'])}
                    <span className="rating-value">({feedback['Product Quality']})</span>
                  </td>
                  <td>
                    {renderRatingStars(feedback['Product Packaging'])}
                    <span className="rating-value">({feedback['Product Packaging']})</span>
                  </td>
                  <td>
                    {renderRatingStars(feedback['Customer Service'])}
                    <span className="rating-value">({feedback['Customer Service']})</span>
                  </td>
                  <td className="comments-cell">{feedback['Comments'] || '-'}</td>
                  <td>{feedback['Submission Date']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="export-section mt-4">
        <p>
          <strong>Note:</strong> All feedback data is automatically saved to an Excel file on the server at: 
          <code>feedback_data.xlsx</code>
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;