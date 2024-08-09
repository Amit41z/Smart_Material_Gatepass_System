// index.js or main entry file

import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);


