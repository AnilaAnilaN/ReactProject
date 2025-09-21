import React from 'react';
import { Link } from 'react-router-dom';
import OrderHistoryPage from './OrderHistoryPage';

const AccountPage = () => {
  return (
    <div className="account-page">
      <h1>Account Information</h1>
      <p>This is where your account details and personal data will be displayed.</p>
      <Link to="/order-history">View Order History</Link>
    </div>
  );
};

export default AccountPage;