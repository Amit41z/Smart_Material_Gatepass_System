// src/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const allowedDesignations = ['Manager', 'Supervisor', 'Engineer'];

const ProtectedRoute = ({ element, user }) => {
  if (!user || !allowedDesignations.includes(user.designation)) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default ProtectedRoute;

