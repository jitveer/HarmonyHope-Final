// export const UserTokenVerification = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//         const res = await fetch("http://localhost:5000/api/user/login", {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         if (res.ok) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error("Token verification failed", error);
//         return false;
//     }
// };


// UserTokenVerification();



// OUR COUSTOM HOOK

import { useState, useEffect } from "react";

export function UserTokenVerification() {
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(true);
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

                setIsValid(res.ok);
            } catch (error) {
                console.error("Token verification failed", error);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]); // Empty dependency = component mount hote hi run hoga

    return { isValid, loading };
}

