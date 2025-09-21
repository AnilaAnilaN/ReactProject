import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming axios for API calls
import './RegisterPage.css'; // We'll create this CSS file


const RegisterPage = ({ onClose, onShowLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/users/register', { name, email, password }); // Adjust API endpoint as needed
        localStorage.setItem('token', res.data.token);
        // Redirect to a dashboard or home page after registration
        if (onClose) onClose(); // Close modal on success
        navigate('/'); 
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="#" onClick={onShowLogin}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;