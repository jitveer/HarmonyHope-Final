import styles from './Donate.module.css';

const Donate = () => {




    return (
        <>
            <div className={styles["donation-container"]}>
                <div className={styles["donation-header"]}>
                    <h2>Your Donation Matters 🙏</h2>
                    <p>“No one has ever become poor by giving.”</p>
                    <p>“Help today, hope for tomorrow.”</p>
                </div>
                <div className={styles["donation-card"]}>
                    <form >
                        <div className={styles["donation-amount"]}>
                            <label for="">Amount</label>
                            <input type="number" placeholder='1000rs' />
                        </div>
                        <div className={styles["submit-donation"]}>
                            <button type='submit'>Donate</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Donate;