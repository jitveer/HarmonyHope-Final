import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { UserTokenVerification } from "../UserTokenVerification/UserTokenVerification";


function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isValid, loading } = UserTokenVerification(); // coming from custom hook


    // MOBILE MENU TOGGLE
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            {/* <h1>{isValid ? "True" : "False"}</h1> */}

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
                                isValid ? (

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
                                    isValid ? (
                                        <Link to="/user-profile"><i className="ri-user-line"></i></Link>
                                    ) : (
                                        <Link to="/"><i className="ri-user-line"></i></Link>
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
                    <div
                        className={style["mobile-menu-sidepanel"]}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className={style["mobile-menu-close"]}
                            onClick={closeMobileMenu}
                            aria-label="Close mobile menu"
                        >
                            <i className="ri-close-line"></i>
                        </button>
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
