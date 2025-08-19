import { useState } from "react";
import { useSelector } from "react-redux";
import { apiCalling } from "../../apiService/apiCalling";
import './User.css';

export default function AddUser() {
    const token = useSelector((state) => state.auth.token);

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        profilePic: null
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'profilePic') {
            const file = files[0];
            if (file) {
                setFormData((prev) => ({ ...prev, profilePic: file }));
                setPreviewUrl(URL.createObjectURL(file));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('middleName', formData.middleName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('email', formData.email);


        if (formData.profilePic) {
            formDataToSend.append('profilePic', formData.profilePic);
        }

        try {
            await apiCalling({
                url: '/CreateUser',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            alert('User added successfully!');

            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                profilePic: null
            });
            setPreviewUrl(null);
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user.');
        }
    };

    const handleProfileClick = () => {
        document.getElementById('profileInput').click();
    };

    return (
        <div className="wrapper">
            <div className="card">
                <h2 className="title">Add User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />

                        <label htmlFor="middleName">Middle Name</label>
                        <input
                            id="middleName"
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="form-input"
                        />

                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />

                        <label>Profile Picture</label>
                        <div>
                            <div
                                onClick={handleProfileClick}
                                className="profile-upload"
                                style={{
                                    backgroundImage: previewUrl ? `url(${previewUrl})` : 'none'
                                }}
                            >
                                {!previewUrl && <span>Click to Upload</span>}
                            </div>
                            <input
                                type="file"
                                id="profileInput"
                                name="profilePic"
                                accept="image/*"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button type="submit" className="btn-submit">
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
