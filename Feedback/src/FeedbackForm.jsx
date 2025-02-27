import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FeedbackForm.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    ticketNumber: '',
    shopLocation: '',
    otherLocation: '',
    productQuality: 0,
    productPackaging: 0,
    customerService: 0,
    comments: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(`${API_URL}/feedback`, formData);
      if (response.data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage('Failed to save feedback. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error submitting feedback. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingEmoji = (value) => {
    switch (value) {
      case 1:
        return '😞 Poor';
      case 2:
        return '😕 Fair';
      case 3:
        return '😊 Good';
      case 4:
        return '😃 Very Good';
      case 5:
        return '🤩 Excellent!';
      default:
        return '';
    }
  };

  const renderStarRating = (field) => (
    <div className="d-flex align-items-center">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= formData[field] ? 'selected' : ''}`}
            onClick={() => handleRatingChange(field, star)}
          >
            ★
          </span>
        ))}
      </div>
      <div className="emoji-feedback">{getRatingEmoji(formData[field])}</div>
    </div>
  );

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      ticketNumber: '',
      shopLocation: '',
      otherLocation: '',
      productQuality: 0,
      productPackaging: 0,
      customerService: 0,
      comments: '',
    });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  if (isSubmitted) {
    return (
      <div className="container feedback-container">
        <div className="thank-you-card">
          <div className="check-container">
            <div className="check-icon">✓</div>
          </div>
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully and saved to our records.</p>
          <p>We appreciate your input on our products and services.</p>
          <button className="btn btn-primary mt-3" onClick={resetForm}>
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container feedback-container">
      <div className="feedback-card">
        <div className="header-section">
          <div className="logo-container">
            <img src="./Images/Grihinilogo.jpg" alt="Tata Motors Logo" className="logo" />
          </div>
          <h1 className="text-center form-title">Grihini Shop Feedback</h1>
          <p className="text-center subtitle">Help us serve you better!</p>
          <div className="decorative-line"></div>
        </div>

        {errorMessage && (
          <div className="alert alert-danger mb-4" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="phoneNumber">Whatsapp Number</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="ticketNumber">Ticket Number</label>
            <input
              type="text"
              className="form-control"
              id="ticketNumber"
              name="ticketNumber"
              value={formData.ticketNumber}
              onChange={handleInputChange}
              required
              placeholder="Enter your ticket number"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="shopLocation">Shop Location</label>
            <div className="custom-select-wrapper">
              <select
                className="form-control custom-select"
                id="shopLocation"
                name="shopLocation"
                value={formData.shopLocation}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select shop location --</option>
                <option value="Telco Colony Shop<">Telco Colony Shop</option>
                <option value="Chinchwad Shop">Chinchwad Shop</option>
                <option value="other">Other Location</option>
              </select>
              <span className="custom-select-arrow">▼</span>
            </div>
          </div>

          {formData.shopLocation === 'other' && (
            <div className="form-group mb-3 fade-in">
              <label htmlFor="otherLocation">Specify Other Location</label>
              <input
                type="text"
                className="form-control"
                id="otherLocation"
                name="otherLocation"
                value={formData.otherLocation}
                onChange={handleInputChange}
                required
                placeholder="Enter the location where you purchased the product"
              />
            </div>
          )}

          <div className="rating-section">
            <h4>Please Rate Your Experience</h4>

            <div className="form-group rating-group">
              <label>Product Quality</label>
              {renderStarRating('productQuality')}
            </div>

            <div className="form-group rating-group">
              <label>Product Packaging</label>
              {renderStarRating('productPackaging')}
            </div>

            <div className="form-group rating-group">
              <label>Customer Service</label>
              {renderStarRating('customerService')}
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="comments">Additional Comments</label>
            <textarea
              className="form-control"
              id="comments"
              name="comments"
              rows="3"
              value={formData.comments}
              onChange={handleInputChange}
              placeholder="Tell us more about your experience..."
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary submit-btn" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;