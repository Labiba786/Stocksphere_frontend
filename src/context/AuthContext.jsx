import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('user');
    
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData.user));
    Cookies.set('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 