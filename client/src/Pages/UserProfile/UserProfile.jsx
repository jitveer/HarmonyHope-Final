import { useState } from 'react';
import style from './UserProfile.module.css';

function UserProfile() {

    const [editMode, setEditMode] = useState(false);
    const [selectedImage, setSelectedImage] = useState("src/assets/react.svg");

    const [formData, setFormData] = useState({
        name: 'Raja bhai',
        email: 'raja@gmail.com',
        phone: '7845859685',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleEditMode = () => {
        if (editMode) {
            // 🧠 Save logic here (e.g., API call)
            console.log('Saving profile:', formData);
        }
        setEditMode(prev => !prev);
    };


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div className={style["profile-container"]}>
            <div className={style["profile-card"]}>
                <div className={style["profile-heading"]}>
                    <h1>Profile</h1>
                </div>

                <div className={style["profile"]}>
                    <div className={style["user-img"]}>
                        <div className={style["user-image-preview"]}>
                            <img src={selectedImage} alt="Profile Preview" />
                        </div>
                        <div className={style["image-upload"]}>
                            <label className={style["upload-button"]}>
                                Upload here
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                    </div>

                    <div className={style["user-details"]}>
                        <div className={style["user-name"]}>
                            <label>Name:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{formData.name}</p>
                            )}
                        </div>

                        <div className={style["user-name"]}>
                            <label>Email:</label>
                            {editMode ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{formData.email}</p>
                            )}
                        </div>

                        <div className={style["user-name"]}>
                            <label>Phone:</label>
                            {editMode ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{formData.phone}</p>
                            )}
                        </div>

                        {editMode && (
                            <div className={style["user-name"]}>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                />
                            </div>
                        )}

                        <div className={style["user-edit-profile"]}>
                            <button onClick={toggleEditMode}>
                                {editMode ? 'Save Profile' : 'EDIT Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
