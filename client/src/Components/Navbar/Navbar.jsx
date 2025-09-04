import { useEffect, useState, useContext } from "react";
import { } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserTokenValidation } from "../UserTokenVerification/UserTokenVerification";
import userImage from "/src/assets/user-profile.png"




function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const { isValidToken, userId, setIsValidToken, setUserId } = useUserTokenValidation();

    const navigate = useNavigate();


    console.log("navbar lsoin = ", isValidToken)


    // MOBILE MENU TOGGLE
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);



    //LOG OUT USER
    const logOut = async () => {
        localStorage.removeItem("token");
        setIsValidToken(false);
        setUserId(null);
        setUserName("");
        navigate("/");
    };




    useEffect(() => {

        if (!userId) return;

        const fetchUserData = async () => {

            // console.log(userId, isValidToken);
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
                })

                if (!res.ok) {
                    console.error("Failed to fetch user data");
                    return;
                }

                const data = await res.json();
                setUserName(data.user.name);
                // console.log(data.user.name);

            } catch (err) {
                console.error("Error fetching user Data");
            }

            // if (isValidToken) {

            // }
        }

        fetchUserData();


    }, [isValidToken])







    return (
        <>

            <nav className={style.navbar}>
                <div className={style["navbar-container"]}>
                    <div className={style["navbar-content"]}>
                        <div className={style["navbar-brand"]}>
                            <h1 className={style["navbar-logo"]}>Harmony Hope</h1>
                        </div>

                        <div className={style["navbar-menu"]}>
                            <Link to="/" className={style["navbar-link"]}>Home</Link>
                            <Link to="/" className={style["navbar-link"]}>About Us</Link>

                            {
                                isValidToken ? (

                                    <Link to="/user-dashboard" className={style["navbar-link"]}>Dashboard</Link>

                                ) : (
                                    <>
                                        <Link to="/login" className={style["navbar-link"]}>Login</Link>
                                        <Link to="/register" className={style["navbar-link"]}>Register</Link>
                                    </>
                                )
                            }
                        </div>

                        <div className={style["navbar-actions"]}>
                            <div className={style["navbar-icon"]}>
                                <i className="ri-notification-line"></i>
                            </div>
                            <div className={style["navbar-icon"]}>
                                {
                                    isValidToken ? (
                                        <div className={style["profile-icon-container"]}>
                                            <Link to="/user-profile"><i className="ri-user-line"></i></Link>
                                            <span>{userName}</span>
                                            <button onClick={logOut}>Log Out</button>
                                        </div>

                                    ) : (
                                        <>
                                            <Link to="/"><i className="ri-user-line"></i></Link>
                                        </>
                                    )
                                }
                            </div>

                            {/* Mobile menu button */}
                            <div className={style["navbar-mobile-menu"]}>
                                <button
                                    className={style["mobile-menu-button"]}
                                    onClick={toggleMobileMenu}
                                    aria-label="Toggle mobile menu"
                                >
                                    <i className={`ri-menu-line ${style["mobile-menu-icon"]}`}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (


                <div className={style["mobile-menu-backdrop"]} onClick={closeMobileMenu}>
                    <div className={style["mobile-menu-sidepanel"]} onClick={e => e.stopPropagation()} >

                        {/* <button
                            className={style["mobile-menu-close"]}
                            onClick={closeMobileMenu}
                            aria-label="Close mobile menu"
                        >
                            <i className="ri-close-line"></i>
                        </button> */}


                        <div className={style["userView"]}>
                            <div className={style["userImg"]}>
                                <img src={userImage} alt="user_img" />
                            </div>
                            <div className={style["userNameSection"]}>
                                <span className={style["userName"]}>Raja Kumar</span>
                                <span className={style["userdesignation"]}>IT Engineer</span>
                            </div>
                        </div>

                        <nav className={style["mobile-menu-links"]}>
                            <Link to="/" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>Home</Link>
                            <Link to="/" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>About</Link>
                            <Link to="/register" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>Register</Link>
                            <Link to="/login" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>Login</Link>
                        </nav>
                    </div>
                </div>











            )}
        </>
    );
}

export default Navbar;
