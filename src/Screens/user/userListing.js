import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiCalling } from "../../apiService/apiCalling";
import { useNavigate } from "react-router-dom";

export default function UserListing() {
    const [usersData, setUsersData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiCalling({
                    url: '/GetUsers',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsersData(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleAdd = () => {
        navigate('/addUser')
    }

    const handleView = () => {
        navigate(`/viewUser/${selectedUserId}`);
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button
                    style={{
                        backgroundColor: '#0d6efd',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0b5ed7')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#0d6efd')}
                    onClick={handleView}
                >
                    View User
                </button>
                <button
                    style={{
                        backgroundColor: '#0d6efd',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0b5ed7')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#0d6efd')}
                    onClick={handleAdd}
                >
                    Add User
                </button>
            </div>
            <h2>User Listing</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f1e7e7ff' }}>
                        <th style={thStyle}></th>
                        <th style={thStyle}>First Name</th>
                        <th style={thStyle}>Middle Name</th>
                        <th style={thStyle}>Last Name</th>
                        <th style={thStyle}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user) => (
                        <tr key={user.userId} style={{ borderBottom: '1px solid #ccc' }}>
                            <td style={tdStyle}>
                                <input
                                    type="radio"
                                    name="selectedUser"
                                    value={user.userId}
                                    checked={selectedUserId === user.userId}
                                    onChange={() => setSelectedUserId(user.userId)}
                                />
                            </td>
                            <td style={tdStyle}>{user.firstName}</td>
                            <td style={tdStyle}>{user.middleName}</td>
                            <td style={tdStyle}>{user.lastName}</td>
                            <td style={tdStyle}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUserId && (
                <div style={{ marginTop: '20px' }}>
                    <strong>Selected User ID:</strong> {selectedUserId}
                </div>
            )}
        </div>
    );
}

// Table cell styles
const thStyle = {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #ddd',
};

const tdStyle = {
    padding: '10px',
    textAlign: 'left',
};
