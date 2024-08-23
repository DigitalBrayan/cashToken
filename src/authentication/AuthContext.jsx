import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [role, setRole] = useState(localStorage.getItem('perfil'));

  const setToken = (newToken, newUser, newRole) => {
    if (newToken === null) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('perfil');
      setUser(null);
      setRole(null);
    } else {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', newUser);
      localStorage.setItem('perfil', newRole);
    }
    setTokenState(newToken);
    setUser(newUser);
    setRole(newRole);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
