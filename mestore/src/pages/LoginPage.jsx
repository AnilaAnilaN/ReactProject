import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming axios for API calls
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserProvider.jsx';
import './LoginPage.css'; // We'll create this CSS file

const LoginPage = ({ onClose, onShowRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;
  const { login } = useContext(UserContext); // Get login function from context

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Login form data:', formData); // Add this line for debugging
    try {
      console.log('Frontend: Sending login request...'); // Debug log 1
      const response = await axios.post('http://localhost:5000/api/users/login', formData); // Adjust API endpoint as needed
      const resData = response.data;
      console.log('Frontend: Received response data:', resData); // Debug log 2

      if (!resData._id) {
        console.log('Frontend: resData._id is missing.'); // Debug log 3
        toast.error('Login failed: User ID not received from server.');
        setLoading(false);
        return;
      }

      console.log('Frontend: User ID found, proceeding with login.'); // Debug log 4
      localStorage.setItem('token', resData.token);
      login(resData); // Call login from UserContext with the entire resData
      console.log('Frontend: Login function called, attempting toast.'); // Debug log 5
      toast.success('Logged in successfully!');
      if (onClose) onClose(); // Close modal on success
      navigate('/'); 
    } catch (err) {
      console.log('Frontend: Login request caught an error:', err); // Debug log 6
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={onSubmit}>
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
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="#" onClick={onShowRegister}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
