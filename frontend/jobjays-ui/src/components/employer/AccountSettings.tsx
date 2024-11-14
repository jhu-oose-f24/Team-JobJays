// import React, { useState } from 'react';
// import styles from '@/styles/account-settings.module.css';

// const AccountSettings: React.FC = () => {
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [mapLocation, setMapLocation] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');

//     const handleSaveChanges = () => {
//         console.log('Saved changes:', { mapLocation, phone, email });
//     };

//     const handleChangePassword = () => {
//         if (newPassword === confirmPassword) {
//             console.log('Password changed:', { currentPassword, newPassword });
//         } else {
//             console.log('Passwords do not match!');
//         }
//     };

//     const handleCloseAccount = () => {
//         console.log('Account closed');
//     };

//     return (
//         <div className={styles.container}>
//             {/* Contact Information */}
//             <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Contact Information</h3>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="mapLocation">Map Location</label>
//                     <input
//                         type="text"
//                         id="mapLocation"
//                         className={styles.inputText}
//                         placeholder="Map location"
//                         value={mapLocation}
//                         onChange={(e) => setMapLocation(e.target.value)}
//                     />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="phone">Phone</label>
//                     <div className={styles.phoneInputWrapper}>
//                         <select className={styles.countryCode}>
//                             <option value="+880">🇧🇩 +880</option>
//                         </select>
//                         <input
//                             type="text"
//                             id="phone"
//                             className={styles.inputText}
//                             placeholder="Phone number.."
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         className={styles.inputText}
//                         placeholder="Email address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <button className={styles.saveButton} onClick={handleSaveChanges}>
//                     Save Changes
//                 </button>
//             </div>

//             <div className={styles.divider} />

//             {/* Change Password */}
//             <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Change Password</h3>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="currentPassword">Current Password</label>
//                     <input
//                         type="password"
//                         id="currentPassword"
//                         className={styles.inputText}
//                         placeholder="Current Password"
//                         value={currentPassword}
//                         onChange={(e) => setCurrentPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="newPassword">New Password</label>
//                     <input
//                         type="password"
//                         id="newPassword"
//                         className={styles.inputText}
//                         placeholder="New Password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         className={styles.inputText}
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                 </div>
//                 <button className={styles.changePasswordButton} onClick={handleChangePassword}>
//                     Change Password
//                 </button>
//             </div>

//             <div className={styles.divider} />

//             {/* Delete Account */}
//             <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Delete Your Company</h3>
//                 <p className={styles.warningText}>
//                     If you delete your account, you will no longer be able to access the platform.
//                 </p>
//                 <button className={styles.closeAccountButton} onClick={handleCloseAccount}>
//                     Close Account
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AccountSettings;
"use client";

import React, { useState } from 'react';
import styles from '@/styles/account-settings.module.css';
import { Settings, MapPin, Phone, Mail, Lock, AlertTriangle } from 'lucide-react';

const AccountSettings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mapLocation, setMapLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
        <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>{title}</h3>
            {description && <p className={styles.sectionDescription}>{description}</p>}
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <Settings size={24} />
                </div>
                <div>
                    <h1 className={styles.title}>Account Settings</h1>
                    <p className={styles.description}>Manage your account preferences and security</p>
                </div>
            </div>

            <div className={styles.content}>
                {/* Contact Information */}
                <div className={styles.section}>
                    <SectionHeader 
                        title="Contact Information"
                        description="Manage your contact details and location"
                    />
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <MapPin size={16} className={styles.labelIcon} />
                                Map Location
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter your location"
                                value={mapLocation}
                                onChange={(e) => setMapLocation(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Phone size={16} className={styles.labelIcon} />
                                Phone Number
                            </label>
                            <div className={styles.phoneInput}>
                                <select className={styles.countryCode}>
                                    <option value="+880">🇧🇩 +880</option>
                                </select>
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Mail size={16} className={styles.labelIcon} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.saveButton}>Save Changes</button>
                    </div>
                </div>

                {/* Change Password */}
                <div className={styles.section}>
                    <SectionHeader 
                        title="Change Password"
                        description="Ensure your account is using a secure password"
                    />
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Lock size={16} className={styles.labelIcon} />
                                Current Password
                            </label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Lock size={16} className={styles.labelIcon} />
                                New Password
                            </label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Lock size={16} className={styles.labelIcon} />
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.saveButton}>Update Password</button>
                    </div>
                </div>

                {/* Delete Account */}
                <div className={styles.dangerSection}>
                    <SectionHeader 
                        title="Delete Account"
                        description="Once you delete your account, there is no going back. Please be certain."
                    />
                    <div className={styles.dangerZone}>
                        <div className={styles.warningMessage}>
                            <AlertTriangle className={styles.warningIcon} size={20} />
                            <p>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
                        </div>
                        <button className={styles.deleteButton}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;