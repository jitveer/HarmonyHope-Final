import { useState } from 'react';
import styles from './Request.module.css';

const Request = () => {
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to make a request.');
            return;
        }

        // Decode token to get user info (basic base64 decoding)
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        const { name, email, phone } = decoded;

        const requestData = {
            name,
            email,
            phone,
            amount,
            reason,
        };

        try {
            const res = await fetch('http://localhost:5000/api/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Request sent successfully!');
                setAmount('');
                setReason('');
                console.log(res)
            } else {
                setMessage(data.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send request.');
        }
    };

    return (
        <>
            <div className={styles["request-container"]}>
                <h1>Make a Support Request</h1>
                <div className={styles["request-card"]}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles["request-amount"]}>
                            <label>Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles["request-reason"]}>
                            <label>Reason for request</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                cols="30"
                                placeholder="Type your reason here..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className={styles["request-categories"]}>
                            <label>Request Categories</label>
                            <select >
                                <option>Medical</option>
                                <option>Education</option>
                                <option>Emergency</option>
                                <option>Food</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className={styles["request-button"]}>
                            <button type="submit">Request</button>
                        </div>
                        {message && (
                            <p className={styles["request-message"]}>{message}</p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Request;
