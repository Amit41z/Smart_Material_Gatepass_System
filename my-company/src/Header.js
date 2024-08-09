import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import tataSteelLogo from './assets/tataSteelLogo2.png'; // Adjust the path as needed

const Header = ({ isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={tataSteelLogo} alt="Tata Steel" style={styles.logo} />
      </div>
      <nav style={styles.mainNav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/about-us" style={styles.navLink}>About Us</Link>
        <Link to="/services" style={styles.navLink}>Services</Link>
        <Link to="/contact" style={styles.navLink}>Contact</Link>
      </nav>
      <nav style={styles.userNav}>
        {isAuthenticated ? (
          <div style={styles.userIconContainer} onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} style={styles.userIcon} />
            {isDropdownOpen && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownItem} onClick={handleProfileClick}>
                  Profile
                </div>
                <div style={styles.dropdownItem} onClick={onLogout}>
                  Sign Out
                  <FontAwesomeIcon icon={faSignOutAlt} style={styles.signOutIcon} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <button style={styles.button} onClick={() => navigate('/login')}>
            Login / SignUp
          </button>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#003366', // Gray color with 50% transparency
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '35px', // Adjust the height of the logo
    // mixBlendMode: 'multiply'
  },
  mainNav: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  navLink: {
    color: 'white',
    marginLeft: '30px',
    textDecoration: 'none',
    fontSize: '23px',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#00509e', // Slightly lighter blue for hover effect
    },
  },
  userNav: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    marginLeft: '10px',
    backgroundColor: 'transparent',
    border: '2px solid white',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    ':hover': {
      backgroundColor: 'white',
      color: '#003366',
    },
  },
  userIconContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  userIcon: {
    color: 'white',
    fontSize: '20px',
    marginLeft: '10px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#001f3f',
    minWidth: '160px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1,
  },
  dropdownItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    borderBottom: '1px solid #666',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#00509e',
    },
  },
  signOutIcon: {
    marginLeft: '10px',
  },
};

  
export default Header;