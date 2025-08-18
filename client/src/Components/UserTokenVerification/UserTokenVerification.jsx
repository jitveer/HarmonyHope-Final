import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function UserTokenVerification() {
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsValid(false);
                setLoading(false);
                return;
            }

            try {
                // Verify token with backend
                const res = await fetch("http://localhost:5000/api/user/verify", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    setIsValid(true);
                    // Decode token locally
                    const decodedUser = jwtDecode(token);
                    setUserId(decodedUser.userId);

                } else {
                    setIsValid(false);
                }

            } catch (error) {
                console.error("Token verification failed", error);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();

    }, []); // ✅ run once on mount

    return { isValid, loading, userId };
}
