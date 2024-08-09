import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState([]);
  const [designation, setDesignation] = useState('manager'); // Set the designation, or fetch it from context or props

  useEffect(() => {
    // Fetch form data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/formdata');
        setFormData(response.data.userdata);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (personalNumber, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/admin/update/${personalNumber}`,
        {}, // Empty body for PATCH request
        {
          headers: {
            'Content-Type': 'application/json',
            'status': status,
            'designation': designation,
            'personalnumber': personalNumber
          }
        }
      );
      // Optionally, re-fetch data or update local state
      const response = await axios.get('http://localhost:5000/admin/formdata');
      setFormData(response.data.userdata);
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
    }
  };

  return (
    <div style={styles.adminDashboard}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <table style={styles.dashboardTable}>
        <thead>
          <tr>
            {[
              'Name', 'Personal Number', 'Source Location', 'Destination Location', 'Source Department',
              'Source Sub Department', 'Destination Department', 'Destination Sub Department', 'Material Type',
              'Material Quantity', 'Unit', 'Purpose', 'Status', 'Actions'
            ].map(header => (
              <th key={header} style={styles.tableHeader}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formData.map(item => (
            <tr key={item.personalNumber} style={styles.tableRow}>
              <td style={styles.tableCell}>{item.name}</td>
              <td style={styles.tableCell}>{item.personalNumber}</td>
              <td style={styles.tableCell}>{item.sourceLocation}</td>
              <td style={styles.tableCell}>{item.destinationLocation}</td>
              <td style={styles.tableCell}>{item.sourceDept}</td>
              <td style={styles.tableCell}>{item.sourceSubDept}</td>
              <td style={styles.tableCell}>{item.destinationDept}</td>
              <td style={styles.tableCell}>{item.destinationSubDept}</td>
              <td style={styles.tableCell}>{item.materialType}</td>
              <td style={styles.tableCell}>{item.materialQuantity}</td>
              <td style={styles.tableCell}>{item.unitOfMeasure}</td>
              <td style={styles.tableCell}>{item.purpose}</td>
              <td style={styles.tableCell}>{item.status}</td>
              <td style={styles.tableCell}>
                <button style={{ ...styles.button, ...styles.approveButton }} onClick={() => handleUpdate(item.personalNumber, 'Approved')}>Approve</button>
                <button style={{ ...styles.button, ...styles.rejectButton }} onClick={() => handleUpdate(item.personalNumber, 'Rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  adminDashboard: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  dashboardTable: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '0 auto',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px',
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  button: {
    padding: '8px 16px',
    margin: '4px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  approveButtonHover: {
    backgroundColor: '#45a049',
  },
  rejectButtonHover: {
    backgroundColor: '#e41e1e',
  },
};

export default AdminDashboard;
