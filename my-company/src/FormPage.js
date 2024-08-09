import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faCubes, faTasks, faBox, faRulerCombined, faCommentDots, faUser, faIdBadge, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import tataSteelLogo from './assets/tataSteelLogo2.png';

const tataSteelPlants = [
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

const materialTypes = [
    'Steel',
    'Copper',
    'Iron Ore',
    'Coal',
    'Limestone',
    'Concrete',
    'Lubricants',
    'Spare Parts',
    'Testing Equipment',
    'Quality Control Kits',
    'Pallets',
    'Forklifts',
    'Safety Gear',
    'First Aid Kits',
    'Health Kits',
    'Moulds',
    'Others'
];

const departments = {
    'Jamshedpur, Jharkhand': {
        'Engineering': {
            subDepts: ['Mechanical', 'Electrical'],
            materials: ['Steel', 'Copper']
        },
        'Production': {
            subDepts: ['Rolling Mill', 'Blast Furnace'],
            materials: ['Iron Ore', 'Coal']
        },
        'Maintenance': {
            subDepts: ['General Maintenance', 'Preventive Maintenance'],
            materials: ['Lubricants', 'Spare Parts']
        }
    },
    'Kalinganagar, Odisha': {
        'Engineering': {
            subDepts: ['Mechanical', 'Civil'],
            materials: ['Steel', 'Concrete']
        },
        'Production': {
            subDepts: ['Sinter Plant', 'Steel Melting Shop'],
            materials: ['Iron Ore', 'Limestone']
        },
        'Safety': {
            subDepts: ['Plant Safety', 'Employee Safety'],
            materials: ['Safety Gear', 'First Aid Kits']
        }
    },
    'Dharwad, Karnataka': {
        'Production': {
            subDepts: ['Foundry', 'Casting'],
            materials: ['Iron Ore', 'Moulds']
        },
        'Safety': {
            subDepts: ['Plant Safety', 'Health and Safety'],
            materials: ['Safety Gear', 'Health Kits']
        },
        'Quality Control': {
            subDepts: ['Material Testing', 'Process Control'],
            materials: ['Testing Equipment', 'Quality Control Kits']
        }
    },
    'Gopalpur, Odisha': {
        'Maintenance': {
            subDepts: ['General Maintenance', 'Preventive Maintenance'],
            materials: ['Lubricants', 'Spare Parts']
        },
        'Safety': {
            subDepts: ['Health and Safety', 'Plant Safety'],
            materials: ['Safety Gear', 'Health Kits']
        },
        'Logistics': {
            subDepts: ['Material Handling', 'Dispatch'],
            materials: ['Pallets', 'Forklifts']
        }
    },
    'Meramandali, Odisha': {
        'Engineering': {
            subDepts: ['Mechanical', 'Electrical'],
            materials: ['Steel', 'Copper']
        },
        'Logistics': {
            subDepts: ['Material Handling', 'Dispatch'],
            materials: ['Pallets', 'Forklifts']
        },
        'Production': {
            subDepts: ['Blast Furnace', 'Rolling Mill'],
            materials: ['Iron Ore', 'Coal']
        }
    },
    'Tarapur, Maharashtra': {
        'Quality Control': {
            subDepts: ['Material Testing', 'Process Control'],
            materials: ['Testing Equipment', 'Quality Control Kits']
        },
        'Maintenance': {
            subDepts: ['General Maintenance', 'Preventive Maintenance'],
            materials: ['Lubricants', 'Spare Parts']
        },
        'Production': {
            subDepts: ['Foundry', 'Casting'],
            materials: ['Iron Ore', 'Moulds']
        }
    },
    'Tata Steel BSL, Odisha': {
        'Logistics': {
            subDepts: ['Material Handling', 'Dispatch'],
            materials: ['Pallets', 'Forklifts']
        },
        'Safety': {
            subDepts: ['Plant Safety', 'Health and Safety'],
            materials: ['Safety Gear', 'First Aid Kits']
        },
        'Engineering': {
            subDepts: ['Mechanical', 'Electrical'],
            materials: ['Steel', 'Copper']
        }
    },
    'Joda, Odisha': {
        'Production': {
            subDepts: ['Sinter Plant', 'Steel Melting Shop'],
            materials: ['Iron Ore', 'Limestone']
        },
        'Maintenance': {
            subDepts: ['General Maintenance', 'Preventive Maintenance'],
            materials: ['Lubricants', 'Spare Parts']
        },
        'Quality Control': {
            subDepts: ['Material Testing', 'Process Control'],
            materials: ['Testing Equipment', 'Quality Control Kits']
        }
    },
    'Noamundi, Jharkhand': {
        'Safety': {
            subDepts: ['Plant Safety', 'Employee Safety'],
            materials: ['Safety Gear', 'First Aid Kits']
        },
        'Engineering': {
            subDepts: ['Mechanical', 'Civil'],
            materials: ['Steel', 'Concrete']
        },
        'Logistics': {
            subDepts: ['Material Handling', 'Dispatch'],
            materials: ['Pallets', 'Forklifts']
        }
    },
};

const unitsOfMeasure = [
    'Kilograms (kg)',
    'Metric Tons (MT)',
    'Liters (L)',
    'Cubic Meters (m³)',
    'Pieces (pcs)',
    'Meters (m)',
    'Units (units)',
    'Grams (g)',
];

const FormPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [materialQuantity, setMaterialQuantity] = useState('');
    const [sourceLocation, setSourceLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [sourceDept, setSourceDept] = useState('');
    const [sourceSubDept, setSourceSubDept] = useState('');
    const [destinationDept, setDestinationDept] = useState('');
    const [destinationSubDept, setDestinationSubDept] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [purpose, setPurpose] = useState('');
    const [unitOfMeasure, setUnitOfMeasure] = useState('');
    const [remarks, setRemarks] = useState('');
    const [status, setStatus] = useState('pending'); // New status field

    const [hoveredButton, setHoveredButton] = useState(null);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= 0 && !value.startsWith('-'))) {
            setMaterialQuantity(value);
        }
    };

    const generateRequestID = () => {
        return 'REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const timestamp = new Date().toISOString();
        const requestID = generateRequestID(); // Generate requestID

        const formData = {
            name,
            personalNumber,
            sourceLocation,
            destinationLocation,
            sourceDept,
            sourceSubDept,
            destinationDept,
            destinationSubDept,
            materialType,
            materialQuantity,
            purpose,
            unitOfMeasure,
            remarks,
            status, // Include status in form data
            timestamp,
            requestID // Include requestID in form data
        };

        try {
            await axios.post('http://localhost:5000/api/form', formData);
            alert('Form submitted successfully!');
            // Clear the form fields
            setName('');
            setPersonalNumber('');
            setMaterialQuantity('');
            setSourceLocation('');
            setDestinationLocation('');
            setSourceDept('');
            setSourceSubDept('');
            setDestinationDept('');
            setDestinationSubDept('');
            setMaterialType('');
            setPurpose('');
            setUnitOfMeasure('');
            setRemarks('');
            setStatus('pending'); // Reset status
            // Redirect to home page
            navigate('/');
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Error submitting the form. Please try again.');
        }
    };

    const filteredDestinationOptions = tataSteelPlants.filter(
        (plant) => plant !== sourceLocation
    );

    const filteredSourceOptions = tataSteelPlants.filter(
        (plant) => plant !== destinationLocation
    );

    const sourceDepts = sourceLocation ? Object.keys(departments[sourceLocation]) : [];
    const sourceSubDepts = sourceDept ? departments[sourceLocation][sourceDept].subDepts : [];

    const destinationDepts = destinationLocation ? Object.keys(departments[destinationLocation]) : [];
    const destinationSubDepts = destinationDept ? departments[destinationLocation][destinationDept].subDepts : [];

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <div style={styles.logoContainer}>
                    <img src={tataSteelLogo} alt="Tata Steel Logo" style={styles.logo} />
                </div>
                <h2 style={styles.header}>Material Transfer Request Form</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faUser} style={styles.icon} />
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faIdBadge} style={styles.icon} />
                        <label>Personal Number:</label>
                        <input
                            type="text"
                            value={personalNumber}
                            onChange={(e) => setPersonalNumber(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
                        <label>Source Location:</label>
                        <select
                            value={sourceLocation}
                            onChange={(e) => {
                                setSourceLocation(e.target.value);
                                setSourceDept('');
                                setSourceSubDept('');
                            }}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Source Location</option>
                            {tataSteelPlants.map((plant) => (
                                <option key={plant} value={plant}>
                                    {plant}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
                        <label>Destination Location:</label>
                        <select
                            value={destinationLocation}
                            onChange={(e) => {
                                setDestinationLocation(e.target.value);
                                setDestinationDept('');
                                setDestinationSubDept('');
                            }}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Destination Location</option>
                            {filteredDestinationOptions.map((plant) => (
                                <option key={plant} value={plant}>
                                    {plant}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faBuilding} style={styles.icon} />
                        <label>Source Department:</label>
                        <select
                            value={sourceDept}
                            onChange={(e) => {
                                setSourceDept(e.target.value);
                                setSourceSubDept('');
                            }}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Source Department</option>
                            {sourceDepts.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faCubes} style={styles.icon} />
                        <label>Source Sub-Department:</label>
                        <select
                            value={sourceSubDept}
                            onChange={(e) => setSourceSubDept(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Source Sub-Department</option>
                            {sourceSubDepts.map((subDept) => (
                                <option key={subDept} value={subDept}>
                                    {subDept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faBuilding} style={styles.icon} />
                        <label>Destination Department:</label>
                        <select
                            value={destinationDept}
                            onChange={(e) => {
                                setDestinationDept(e.target.value);
                                setDestinationSubDept('');
                            }}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Destination Department</option>
                            {destinationDepts.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faCubes} style={styles.icon} />
                        <label>Destination Sub-Department:</label>
                        <select
                            value={destinationSubDept}
                            onChange={(e) => setDestinationSubDept(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Destination Sub-Department</option>
                            {destinationSubDepts.map((subDept) => (
                                <option key={subDept} value={subDept}>
                                    {subDept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faBox} style={styles.icon} />
                        <label>Material Type:</label>
                        <select
                            value={materialType}
                            onChange={(e) => setMaterialType(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Material Type</option>
                            {materialTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faTasks} style={styles.icon} />
                        <label>Material Quantity:</label>
                        <input
                            type="number"
                            value={materialQuantity}
                            onChange={handleQuantityChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faRulerCombined} style={styles.icon} />
                        <label>Unit of Measure:</label>
                        <select
                            value={unitOfMeasure}
                            onChange={(e) => setUnitOfMeasure(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Unit of Measure</option>
                            {unitsOfMeasure.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faCommentDots} style={styles.icon} />
                        <label>Purpose:</label>
                        <textarea
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            style={styles.textarea}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <FontAwesomeIcon icon={faCommentDots} style={styles.icon} />
                        <label>Remarks:</label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            style={styles.textarea}
                        />
                    </div>
                    <div style={styles.buttonContainer}>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            onMouseEnter={() => setHoveredButton('back')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                ...styles.backButton,
                                ...(hoveredButton === 'back' ? styles.backButtonHover : {})
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </button>
                        <button
                            type="submit"
                            onMouseEnter={() => setHoveredButton('submit')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                ...styles.submitButton,
                                ...(hoveredButton === 'submit' ? styles.submitButtonHover : {})
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'url("https://www.livemint.com/lm-img/img/2023/06/15/1600x900/Tata_Steel_1686798388273_1686798388496.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
        marginBottom: '20px',
        position: 'relative',
        marginTop: '20px'
    },
    logoContainer: {
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
    logo: {
        height: '40px',
    },
    header: {
        color: 'black',
        marginBottom: '20px',
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: '15px',
        color: 'black',
    },
    icon: {
        marginRight: '10px',
        color: '#007bff',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        minHeight: '100px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    backButton: {
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    backButtonHover: {
        backgroundColor: '#5a6268',
    },
    submitButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
};

export default FormPage;


