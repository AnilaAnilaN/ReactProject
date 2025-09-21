import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = (userData) => {
    const completeUserData = {
      _id: userData._id || null,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
      // Add any other user properties you expect
    };
    localStorage.setItem('user', JSON.stringify(completeUserData));
    setUser(completeUserData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading user...</div> : children} {/* Conditionally render children */}
    </UserContext.Provider>
  );
};
