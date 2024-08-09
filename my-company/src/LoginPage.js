import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faBriefcase, faEye, faEyeSlash, faIdBadge, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import tataSteelLogo from './assets/tataSteelLogo2.png'; // Make sure to replace with the correct path to your logo

const LoginPage = ({ onLogin }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [location, setLocation] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [errors, setErrors] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const designations = [
        'Chairman', 'Chief Executive Officer (CEO)', 'Managing Director (MD)', 'Chief Operating Officer (COO)',
        'Chief Financial Officer (CFO)', 'Chief Technology Officer (CTO)', 'Chief Human Resources Officer (CHRO)',
        'Chief Marketing Officer (CMO)', 'Executive Vice President (EVP)', 'Senior Vice President (SVP)',
        'Vice President (VP)', 'General Manager (GM)', 'Deputy General Manager (DGM)', 'Assistant General Manager (AGM)',
        'Senior Manager', 'Manager', 'Deputy Manager', 'Assistant Manager', 'Senior Engineer', 'Engineer',
        'Junior Engineer', 'Senior Supervisor', 'Supervisor', 'Senior Technician', 'Technician', 'Junior Technician',
        'Senior Executive', 'Executive', 'Junior Executive', 'Administrative Assistant', 'Graduate Trainee', 'Intern'
    ];

    const locations = [
        'Jamshedpur, Jharkhand',
        'Kalinganagar, Odisha',
        'Dharwad, Karnataka',
        'Gopalpur, Odisha',
        'Meramandali, Odisha',
        'Tarapur, Maharashtra',
        'Tata Steel BSL, Odisha',
        'Joda, Odisha',
        'Noamundi, Jharkhand',
    ];

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = () => {
        const newErrors = {};
        if (isSignup && !name) {
            newErrors.name = 'Name is required';
        }
        if (isSignup && !personalNumber) {
            newErrors.personalNumber = 'Personal number is required';
        }
        if (isSignup && !email) {
            newErrors.email = 'Email is required';
        } else if (isSignup && !validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }
        if (isSignup && !designation) {
            newErrors.designation = 'Designation is required';
        }
        if (isSignup && !location) {
            newErrors.location = 'Location is required';
        }
        if (isSignup && !dateOfJoining) {
            newErrors.dateOfJoining = 'Date of Joining is required';
        }
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

    const handleDesignationChange = (e) => {
        setDesignation(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleDateOfJoiningChange = (e) => {
        setDateOfJoining(e.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const url = isSignup ? 'http://localhost:5000/api/signup' : 'http://localhost:5000/api/login';
            const user = isSignup ? { name, personalNumber, email, password, designation, location, dateOfJoining } : { personalNumber, password };

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
                    if (isSignup) {
                        alert('Signup successful! Please log in.');
                        setIsSignup(false);
                        clearFormFields();
                    } else {
                        onLogin(data.token);
                        clearFormFields();
                        navigate('/');
                    }
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const clearFormFields = () => {
        setName('');
        setPersonalNumber('');
        setEmail('');
        setPassword('');
        setDesignation('');
        setLocation('');
        setDateOfJoining('');
        setErrors({});
    };

    const handleToggleSignup = () => {
        setIsSignup(!isSignup);
        clearFormFields();
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.logoContainer}>
                    <img src={tataSteelLogo} alt="Logo" style={styles.logo} />
                </div>
                <h2 style={styles.header}>{isSignup ? 'Sign Up' : 'Login'}</h2>
                {isSignup && (
                    <>
                        <div style={styles.formGroup}>
                            <FontAwesomeIcon icon={faUser} style={styles.icon} />
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={styles.input}
                                aria-label="Name"
                            />
                            {errors.name && <span style={styles.error}>{errors.name}</span>}
                        </div>
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
                            <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.input}
                                aria-label="Email"
                            />
                            {errors.email && <span style={styles.error}>{errors.email}</span>}
                        </div>
                        <div style={styles.formGroup}>
                            <FontAwesomeIcon icon={faBriefcase} style={styles.icon} />
                            <select
                                value={designation}
                                onChange={handleDesignationChange}
                                required
                                style={styles.input}
                                aria-label="Designation"
                            >
                                <option value="">Select Designation</option>
                                {designations.map((designation, index) => (
                                    <option key={index} value={designation}>
                                        {designation}
                                    </option>
                                ))}
                            </select>
                            {errors.designation && <span style={styles.error}>{errors.designation}</span>}
                        </div>
                        <div style={styles.formGroup}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
                            <select
                                value={location}
                                onChange={handleLocationChange}
                                required
                                style={styles.input}
                                aria-label="Location"
                            >
                                <option value="">Select Location</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                            {errors.location && <span style={styles.error}>{errors.location}</span>}
                        </div>
                        <div style={styles.formGroup}>
                            <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
                            <input
                                type="date"
                                value={dateOfJoining}
                                onChange={handleDateOfJoiningChange}
                                required
                                style={styles.input}
                                aria-label="Date of Joining"
                                placeholder="Date of Joining"
                            />
                            {errors.dateOfJoining && <span style={styles.error}>{errors.dateOfJoining}</span>}
                        </div>
                    </>
                )}
                {!isSignup && (
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
                )}
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
                <button
                    type="submit"
                    style={{
                        ...styles.button,
                        backgroundColor: isHovered ? '#0000CD' : '#007bff',
                        color: isHovered ? '#FFFFFF' : '#FFFFFF',
                        // border: isHovered? '2px solid #FFFFFF' :'None',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
                <p style={styles.toggleText}>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <span onClick={handleToggleSignup} style={styles.toggleLink}>
                        {isSignup ? 'Login' : 'Sign Up'}
                    </span>
                </p>
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
        position: 'relative', // Added position relative to the form
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px 40px', // Adjusted padding
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
        marginTop: '50px', // Adjusted to provide space for the logo
        fontSize:'30px',
    },
    formGroup: {
        marginBottom: '20px',
        position: 'relative',
        width: '100%', // Ensure form fields take full width
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        color: 'black',
    },
    input: {
        width: '100%', // Ensure input fields take full width
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
    toggleText: {
        textAlign: 'center',
        marginTop: '20px',
    },
    toggleLink: {
        marginLeft: '5px',
        color: '#007bff',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export default LoginPage;

