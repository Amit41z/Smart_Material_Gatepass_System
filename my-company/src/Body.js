import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tataSteelBackground from './assets/tataSteelBackground.jpg'; // Adjust the path as needed
import logo from './assets/tataSteelLogo2.png'
const Body = () => {
    const [status, setStatus] = useState('Unknown');
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [hoverIndex, setHoverIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchdata() {
            const token = localStorage.getItem('Authorization');

            if (token) {
                setIsAuthenticated(true);
                const data = await fetch('http://localhost:5000/user/formdata', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `${token}`
                    }
                });
                const result = await data.json();
                // console.log(result.formdata.status);
                setStatus(result.formdata.status);
            } else {
                setIsAuthenticated(false);
                navigate('/login')
            }
        }

        fetchdata();
    }, [navigate]);

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(-1);
    };

    return (
        <div style={styles.container}>
            <div style={styles.topContainer}>
                <div style={styles.header}>
                    <h2 style={styles.subheading}>Creating the Future</h2>
                    <h1 style={styles.mainHeading}>Explore Opportunities at <span style={styles.highlight}>Tata Steel</span></h1>
                    <p style={styles.description}>
                        Tata Steel is one of the world's most geographically-diversified steel producers, with operations in 26 countries and a commercial presence in over 50 countries. Our vision is to be the global steel industry benchmark for value creation and corporate citizenship.
                    </p>
                    <div style={styles.quote}>
                        <blockquote>
                            "At Tata Steel, we believe in creating a culture of continuous learning and growth, where each individual's potential is nurtured and their achievements are recognized."
                        </blockquote>
                        <cite>- Tata Steel Management</cite>
                    </div>
                    <div style={styles.buttons}>
                        <Link to="/get-started" style={styles.buttonPrimary}>Get Started</Link>
                        <Link to="/know-more" style={styles.buttonSecondary}>Know More</Link>
                    </div>
                </div>
                <div style={styles.promotions}>
                    {promotionsData.map((promo, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.promoItem,
                                ...(hoverIndex === index && styles.promoItemHover),
                            }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div style={{ ...styles.icon, backgroundImage: `url(${promo.iconUrl})` }}></div>
                            <p>{promo.title}</p>
                            <span>{promo.subtitle}</span>
                            {promo.link && (
                                <div style={styles.buttons}>
                                    <Link to={promo.link} target="_blank" style={styles.buttonPrimary}>Click here</Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.bottomFlexContainer}>
                <div
                    style={{
                        ...styles.flexBoxWithLogo,
                        backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc8lXrJJnhjgcA2YECRXxIXmIvo3lU8mW4BA&)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center', // Replace with your image URL
                    }}
                >
                </div>
                <div style={styles.flexBoxWithLogo}>
                    <img src={logo} alt="Tata Steel Logo" style={styles.logo} /> {/* Replace 'path/to/logo.png' with the actual path to your logo */}
                    <h3>Form Status</h3>
                    <p>{status ? status : "Pending"}</p>
                </div>
                <div
                    style={{
                        ...styles.flexBoxWithLogo
                    }}
                >
                    <img src={logo} alt="Tata Steel Logo" style={styles.logo} />
                    <div style={{
                        ...styles.flexBox,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}>
                        <h3>Material Transfer Form</h3>
                        {isAuthenticated ? (
                            <Link to="/form" style={styles.button}>Fill the Form</Link>
                        ) : (
                            <Link to="/login" style={styles.button}>Login to Fill the Form</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const promotionsData = [
    {
        iconUrl: 'https://stevetough1.files.wordpress.com/2023/06/steel30.jpg',
        title: 'Available Products',
        subtitle: '100+',
    },
    {
        iconUrl: 'https://tse1.mm.bing.net/th?id=OIP.6VHA4-FWje8Fk2lDZCXLMwHaEH&pid=Api&P=0&h=180',
        title: 'Media',
        subtitle: '',
        link: 'https://www.google.com/search?q=tata+steel+images&oq=tata+steel+images&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0NjEzajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8',
    },
    {
        iconUrl: 'https://tse4.mm.bing.net/th?id=OIP.LeCGQDVMx4a1cQXEIvm8LQHaFG&pid=Api&P=0&h=180',
        title: 'Performance',
        subtitle: 'With Exchange Releases',
    },
];

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '50px',
        backgroundColor: '#f7f7f7',
        backgroundImage: `url(${tataSteelBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
    },
    topContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
    },
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 51, 102, 0.8)', // Navy Blue with transparency
        padding: '30px',
        borderRadius: '15px',
        marginRight: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    subheading: {
        fontSize: '28px',
        marginBottom: '10px',
        fontWeight: '500',
    },
    mainHeading: {
        fontSize: '40px',
        marginBottom: '20px',
        lineHeight: '1.2',
        fontWeight: '700',
    },
    highlight: {
        color: '#ffd700', // Gold
    },
    description: {
        fontSize: '18px',
        marginBottom: '20px',
        lineHeight: '1.5',
        fontStyle: 'italic',
    },
    quote: {
        fontSize: '16px',
        fontStyle: 'italic',
        marginBottom: '20px',
        borderLeft: '4px solid #ffd700',
        paddingLeft: '10px',
    },
    buttons: {
        marginTop: '20px',
    },
    buttonPrimary: {
        padding: '12px 24px',
        backgroundColor: '#28a745', // Green
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        marginRight: '10px',
        fontWeight: '500',
        transition: 'background-color 0.3s',
    },
    buttonSecondary: {
        padding: '12px 24px',
        backgroundColor: 'white',
        color: '#28a745', // Green
        textDecoration: 'none',
        borderRadius: '5px',
        border: '1px solid #28a745', // Green
        fontWeight: '500',
        transition: 'background-color 0.3s',
    },
    promotions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with slight transparency
        padding: '20px',
        borderRadius: '15px',
        border: '2px solid #000080', // Navy border
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: 'black',
    },
    promoItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        border: '1px solid #dcdcdc',
        transition: 'transform 0.2s',
    },
    promoItemHover: {
        transform: 'scale(1.05)',
    },
    icon: {
        width: '70px',
        height: '70px',
        backgroundColor: '#d3d3d3',
        borderRadius: '50%',
        marginBottom: '15px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1px solid #000080', // Navy border for icon
    },
    bottomFlexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        gap: '20px',
    },
    flexBox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        margin: '0 10px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        color: 'black',
        position: 'relative', // Added for overlay positioning
    },
    flexBoxWithLogo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 51, 102, 0.8)',
        padding: '20px',
        margin: '0 10px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        color: 'white',
        position: 'relative',
        fontSize: '20px',
    },
    logo: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '120px',
        height: '40px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745', // Green
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '10px',
    },
};

export default Body;