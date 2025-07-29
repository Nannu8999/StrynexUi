import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCalling } from "../../apiService/apiCalling";
import './user.css';

export default function ViewUser() {
    const { userId } = useParams(); // get userId from URL
    const token = useSelector((state) => state.auth.token);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await apiCalling({
                    url: `/GetUserById?userId=${userId}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUserData(response?.data || response);
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
                setError("Failed to load user profile.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [token, userId]);

    if (loading) return <p>Loading user profile...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!userData) return <p>No user data found.</p>;

    return (
        <div className="wrapper">
            <div className="card">
                <h2 className="title">User Profile</h2>

                <div className="profile-pic-wrapper">
                    {userData.profilePicUrl ? (
                        <img
                            src={userData.profilePicUrl}
                            alt="Profile"
                            className="profile-pic"
                        />
                    ) : (
                        <div className="no-pic">No Image</div>
                    )}
                </div>

                <div className="info-grid-two-column">
                    <div className="info-labels">
                        <div className="info-item"><label>First Name</label></div>
                        <div className="info-item"><label>Middle Name</label></div>
                        <div className="info-item"><label>Last Name</label></div>
                        <div className="info-item"><label>Email</label></div>
                    </div>
                    <div className="info-values">
                        <div className="info-item"><span>{userData.firstName}</span></div>
                        <div className="info-item"><span>{userData.middleName || '-'}</span></div>
                        <div className="info-item"><span>{userData.lastName}</span></div>
                        <div className="info-item"><span>{userData.email}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
