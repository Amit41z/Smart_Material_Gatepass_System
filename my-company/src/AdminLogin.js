import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import tataSteelLogo from './assets/tataSteelLogo2.png'; // Make sure to replace with the correct path to your logo

const AdminLogin = () => {
    const [personalNumber, setPersonalNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!personalNumber) {
            newErrors.personalNumber = 'Personal number is required';
        }
        if (!password || password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = 'Password must contain at least one number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const url = 'http://localhost:5000/admin/login';
            const user = { personalNumber, password };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Admin logged In");
                    clearFormFields();
                    navigate('/admin/adminbody');
                } else {
                    setErrorMessage(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    const clearFormFields = () => {
        setPersonalNumber('');
        setPassword('');
        setErrors({});
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.logoContainer}>
                    <img src={tataSteelLogo} alt="Logo" style={styles.logo} />
                </div>
                <h2 style={styles.header}>Login</h2>
                <div style={styles.formGroup}>
                    <FontAwesomeIcon icon={faIdBadge} style={styles.icon} />
                    <input
                        type="text"
                        placeholder="Personal Number"
                        value={personalNumber}
                        onChange={(e) => setPersonalNumber(e.target.value)}
                        required
                        style={styles.input}
                        aria-label="Personal Number"
                    />
                    {errors.personalNumber && <span style={styles.error}>{errors.personalNumber}</span>}
                </div>
                <div style={styles.formGroup}>
                    <FontAwesomeIcon icon={faLock} style={styles.icon} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                        aria-label="Password"
                    />
                    <span style={styles.passwordToggle} onClick={handleTogglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    {errors.password && <span style={styles.error}>{errors.password}</span>}
                </div>
                {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                <button
                    type="submit"
                    style={{
                        ...styles.button,
                        backgroundColor: isHovered ? '#0000CD' : '#007bff',
                        color: isHovered ? '#FFFFFF' : '#FFFFFF',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://www.sae.org/binaries/content/gallery/cm/articles/news/2020/05/tata-steel-plant-overview_banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '90%',
        maxWidth: '400px',
    },
    logoContainer: {
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
    logo: {
        width: '110px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        marginTop: '50px',
        fontSize: '30px',
    },
    formGroup: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        color: 'black',
    },
    input: {
        width: '100%',
        padding: '10px 10px 10px 40px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    passwordToggle: {
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'black',
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default AdminLogin;

