import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import LoginPage from './LoginPage';
import FormPage from './FormPage';
import ProtectedRoute from './ProtectedRoute';
import {jwtDecode} from 'jwt-decode'; // Fix import 
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import Adminbody from './Adminbody';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (token) => {
    const decodedUser = jwtDecode(token);
    setIsAuthenticated(true);
    setUser(decodedUser);
    localStorage.setItem('Authorization', token); // Store the token
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div style={styles.appContainer}>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div style={styles.bodyContainer}>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/form" element={<ProtectedRoute element={<FormPage />} user={user} />} />
          <Route path="/admin/adminDashboard" element={<AdminDashboard/>} />
          <Route path="/admin/adminbody" element={<Adminbody/>} />
          <Route path="/admin/login" element={<AdminLogin/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  bodyContainer: {
    flex: 1,
    padding: '0px',
  },
};

export default App;
