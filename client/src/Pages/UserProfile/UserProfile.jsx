import { useState, useEffect } from 'react';
import style from './UserProfile.module.css';
import { UserTokenVerification } from '../../Components/UserTokenVerification/UserTokenVerification';
import { useNavigate } from 'react-router-dom';


function UserProfile() {
    const [editMode, setEditMode] = useState(false);
    const [selectedImage, setSelectedImage] = useState("src/assets/react.svg");
    const { isValid, userId } = UserTokenVerification(); // token se userId mil rahi hai 

    // const [tokenCheck, setTokenCheck] = useState();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });


    // SAVE DATA TO STATE
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    //WHEN EDIT MODE ( UPDATE USER DATA )

    const toggleEditMode = async () => {
        if (editMode) {

            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                });

                if (!res.ok) {
                    console.error("Failed to update user profile");
                    return;
                }

                const updatedData = await res.json();
                alert("Profile Updated");
                // console.log("Profile updated:", updatedData);

            } catch (err) {
                console.error("Error updating profile:", err);
            }
        }

        setEditMode(prev => !prev);
    };




    // FOR UPLOADING OR CHANGING NEW PROFILE IMAGE
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };





    // FETCHING USER DATA FOR DISPLAY ON PROFILE

    useEffect(() => {


        if (!userId) return;

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }


                const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    console.error("Failed to fetch user data");
                    return;
                }

                const data = await res.json();


                if (data.user) {
                    setFormData({
                        name: data.user.name || '',
                        email: data.user.email || '',
                        phone: data.user.phone || '',
                        password: ''
                    });
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };


        const checkTokens=()=>{
            if(! isValid){
                navigate('/');
            }
        }

        fetchUserData();



        
        
    }, [userId]);









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
