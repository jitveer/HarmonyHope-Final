
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


// OUR COUSTOM HOOK

export function UserTokenVerification() {
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsValid(false);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/api/user/login", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    setIsValid(true);
                    const decodedUser = jwtDecode(token);
                    setUserId(decodedUser.userId);
                    // console.log(decodedUser.userId)
                }

            } catch (error) {
                console.error("Token verification failed", error);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    return { isValid, loading, userId };
}