import { useEffect, useState, useContext } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserTokenValidation } from "../UserTokenVerification/UserTokenVerification";
import userImage from "/src/assets/user-profile.png";
import logo from "/src/assets/hormony_hope_charity_logo.png";


/* ICONS */
import { FaHome, FaInfoCircle, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaBars, FaTachometerAlt } from "react-icons/fa";


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

    //CAPATILIZE FIRST LETTER

    function capitalizeFirstWord(text) {

        if (!text) return "";
        const [firstWord, ...rest] = text.split(" ");
        return `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${rest.join(" ")}`;
    }









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
                        <Link to="/" className={style["navbar-brand"]} >
                            <img className={style["harmonyLogo"]} src={logo} alt="hormony_hope_charity_logo" />
                            <h1 className={style["navbar-logo"]}>Harmony Hope</h1>
                        </Link>

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
                            {/* <div className={[ style["navbar-icon"] , style["navbar-profile-icon"] ].join(" ") }> */}
                            <div className={`${style["navbar-icon"]} ${style["navbar-profile-icon"]}`}>
                                {
                                    isValidToken ? (
                                        <div className={style["profile-icon-container"]}>
                                            <Link to="/user-profile"><i className="ri-user-line"></i></Link>
                                            <span>{capitalizeFirstWord(userName)}</span>
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
                                    <FaBars className={style["mobile-menu-icon"]} />
                                    {/* <i className={`ri-menu-line ${style["mobile-menu-icon"]}`}></i> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            {/* SIDEBAR */}


            {isMobileMenuOpen && (


                <div className={style["mobile-menu-backdrop"]} onClick={closeMobileMenu}>
                    <div className={style["mobile-menu-sidepanel"]} onClick={e => e.stopPropagation()} >

                        <button
                            className={style["mobile-menu-close"]}
                            onClick={closeMobileMenu}
                            aria-label="Close mobile menu"
                        >
                            <i className="ri-close-line"></i>
                        </button>

                        <div className={style["userView"]}>
                            <div className={style["userImg"]}>
                                <img src={userImage} alt="user_img" />
                            </div>
                            {
                                isValidToken ? (
                                    <>

                                        <div className={style["userNameSection"]}>
                                            <span className={style["userName"]}>{capitalizeFirstWord(userName)}</span>
                                            <span className={style["userdesignation"]}>IT Engineer</span>
                                        </div>
                                    </>
                                ) : (<></>)
                            }
                        </div>

                        <nav className={style["mobile-menu-links"]}>
                            <div className={style["mobile-menu-list"]}>
                                <FaHome />
                                <Link to="/" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>Home</Link>
                            </div>
                            {
                                isValidToken ? (
                                    <div className={style["mobile-menu-list"]}>
                                        <FaTachometerAlt />
                                        <Link to="/user-dashboard" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>Dashboard</Link>
                                    </div>
                                ) : (<></>)
                            }
                            <div className={style["mobile-menu-list"]}>
                                <FaInfoCircle />
                                <Link to="/" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>About</Link>
                            </div>


                            {
                                isValidToken ? (
                                    <div className={style["mobile-menu-list"]}>
                                        <FaSignInAlt />
                                        <Link to="/login" className={style["mobile-menu-link"]} onClick={() => { closeMobileMenu(); logOut(); }} >Log Out</Link>
                                    </div>
                                ) : (
                                    <>
                                        <div className={style["mobile-menu-list"]}>
                                            <FaUserPlus />
                                            <Link to="/register" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>Register</Link>
                                        </div>
                                        <div className={style["mobile-menu-list"]}>
                                            <FaSignOutAlt />
                                            <Link to="/login" className={style["mobile-menu-link"]} onClick={closeMobileMenu}>Log In</Link>
                                        </div>
                                    </>

                                )
                            }

                        </nav>
                    </div>
                </div>

            )}
        </>
    );
}

export default Navbar;
