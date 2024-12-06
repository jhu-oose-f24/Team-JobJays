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
import { Settings, Lock, AlertTriangle } from 'lucide-react';
import {changePassword, deleteEmployerAccount, logout} from "@/lib/api";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const AccountSettings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();


    const handleChangePassword = async () => {
        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }
        if (currentPassword === newPassword) {
            toast({
                title: "Error",
                description: "New password cannot be the same as current password",
                variant: "destructive",
            });
            return;
        }
        if (currentPassword === "") {
            toast({
                title: "Error",
                description: "Current password cannot be empty",
                variant: "destructive",
            });
            return;
        }
        const result = await changePassword(data);
        if (result.success) {
            toast({
                title: "Success",
                description: "Password updated successfully! Logging you out now.",
                variant: "default",
            });
            logout();
            router.push("/signin");
        } else {
            toast({
                title: "Error",
                description: `Failed to update password. Message: ${result.error.message}, Code: ${result.error.status}`,
                variant: "destructive",
            });
        }
    }

    const handleDeleteAccount = async() => {
        const result = await deleteEmployerAccount();
        if (result.success) {
            toast({
                title: "Success",
                description: "Employer Account Deleted Successfully. Sorry to see you go!",
                variant: "default",
            });
            logout();
            router.push("/signup");
        } else {
            toast({
                title: "Error",
                description: `Failed to delete employer account. Message: ${result.error.message}, Code: ${result.error.status}`,
                variant: "destructive",
            });
        }
    }


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
                        <button
                            onClick={handleChangePassword}
                            className={styles.saveButton}>Update Password</button>
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
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <button className={styles.deleteButton}>Delete Account</button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    >Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;