import React, { createContext, useState, useEffect } from 'react';

// Create the authentication context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // Check if user is already logged in from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (userData) => {
    // In a real app, you would validate credentials with an API
    // For now, we're just storing the user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Register function
  const register = (userData) => {
    // In a real app, you would send the registration data to an API
    // For now, we'll just store it and log the user in
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  // The context value that will be supplied to any descendants of this provider
  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
