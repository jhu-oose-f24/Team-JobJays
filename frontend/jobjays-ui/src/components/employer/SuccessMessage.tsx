import React from 'react';
import styles from '@/styles/success-message.module.css';

const SuccessMessage: React.FC = () => {
    return (
        <div className={styles.successMessageContainer}>
            <div className={styles.messageBox}>
                <h3>🎉 Congratulations, Your Profile is 100% Complete!</h3>
                <p>Your profile has been successfully created. You can now start posting jobs.</p>
                <div className={styles.actionLinks}>
                    <a href="/employer/dashboard" className={styles.actionLink}>View Dashboard</a>
                    <a href="/employer/post-job" className={styles.actionLink}>Post a Job</a>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
