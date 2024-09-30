import React, { useState } from 'react';
import styles from '@/styles/account-settings.module.css';

const AccountSettings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mapLocation, setMapLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSaveChanges = () => {
        console.log('Saved changes:', { mapLocation, phone, email });
    };

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            console.log('Password changed:', { currentPassword, newPassword });
        } else {
            console.log('Passwords do not match!');
        }
    };

    const handleCloseAccount = () => {
        console.log('Account closed');
    };

    return (
        <div className={styles.container}>
            {/* Contact Information */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Contact Information</h3>
                <div className={styles.formGroup}>
                    <label htmlFor="mapLocation">Map Location</label>
                    <input
                        type="text"
                        id="mapLocation"
                        className={styles.inputText}
                        placeholder="Map location"
                        value={mapLocation}
                        onChange={(e) => setMapLocation(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <div className={styles.phoneInputWrapper}>
                        <select className={styles.countryCode}>
                            <option value="+880">🇧🇩 +880</option>
                        </select>
                        <input
                            type="text"
                            id="phone"
                            className={styles.inputText}
                            placeholder="Phone number.."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.inputText}
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className={styles.saveButton} onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>

            <div className={styles.divider} />

            {/* Change Password */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Change Password</h3>
                <div className={styles.formGroup}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        className={styles.inputText}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className={styles.inputText}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className={styles.inputText}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className={styles.changePasswordButton} onClick={handleChangePassword}>
                    Change Password
                </button>
            </div>

            <div className={styles.divider} />

            {/* Delete Account */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Delete Your Company</h3>
                <p className={styles.warningText}>
                    If you delete your account, you will no longer be able to access the platform.
                </p>
                <button className={styles.closeAccountButton} onClick={handleCloseAccount}>
                    Close Account
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;
