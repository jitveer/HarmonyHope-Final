import React from "react";
import style from '../Footer/Footer.module.css';

const Footer = () => {
    return (
        <>
            <footer className={style["footer"]}>
                <div className="section-container">
                    <div className={style["footer-grid"]}>
                        <div className={style["footer-brand"]}>
                            <h3 className={style["footer-brand-title"]}>Harmony Hope</h3>
                            <p className={style["footer-brand-description"]}>
                                Building a stronger, more supportive workplace community through collective care and compassion.
                            </p>
                            <div className={style["footer-social"]}>
                                <div className={style["social-icon"]}>
                                    <i className="ri-facebook-fill text-lg"></i>
                                </div>
                                <div className={style["social-icon"]}>
                                    <i className="ri-twitter-fill text-lg"></i>
                                </div>
                                <div className={style["social-icon"]}>
                                    <i className="ri-linkedin-fill text-lg"></i>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className={style["footer-links-title"]}>Quick Links</h4>
                            <ul className={style["footer-links-list"]}>
                                <li><a href="/" className={style["footer-link"]}>How It Works</a></li>
                                <li><a href="/" className={style["footer-link"]}>Success Stories</a></li>
                                <li><a href="/" className={style["footer-link"]}>Guidelines</a></li>
                                <li><a href="/" className={style["footer-link"]}>FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className={style["footer-links-title"]}>Support</h4>
                            <ul className={style["footer-links-list"]}>
                                <li><a href="/" className={style["footer-link"]}>Contact Us</a></li>
                                <li><a href="/" className={style["footer-link"]}>Privacy Policy</a></li>
                                <li><a href="/" className={style["footer-link"]}>Terms of Service</a></li>
                                <li><a href="/" className={style["footer-link"]}>Help Center</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={style["footer-bottom"]}>
                        <p className={style["footer-copyright"]}>
                            © 2025 Harmony Hope Internal Donation Platform. All rights reserved.
                        </p>
                        <p className={style["footer-made-with"]}>
                            Made with <span className={style["heart-icon"]}>❤</span> for our amazing team
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
