import React, { useState } from 'react';
import styles from '@/styles/contact-info.module.css';

export interface ContactInfoData {
    mapLocation: string;
    phone: string;
    email: string;
}

interface ContactInfoProps {
    onSubmit: (data: ContactInfoData) => void;
    onPrevious: () => void; // Added this prop for "Previous" button functionality
}

const ContactInfo: React.FC<ContactInfoProps> = ({ onSubmit, onPrevious }) => {
    const [mapLocation, setMapLocation] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = () => {
        const data: ContactInfoData = { mapLocation, phone, email };
        onSubmit(data);
    };

    return (
        <div className={styles.contactInfoContainer}>
            <h3 className={styles.title}>Contact Info</h3>
            <div className={styles.formGroup}>
                <input
                    type="text"
                    placeholder="Map Location"
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    className={styles.inputText}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.inputText}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputText}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.prevButton} onClick={onPrevious}>Previous</button>
                <button onClick={handleSubmit} className={styles.nextButton}>Save & Next</button>
            </div>
        </div>
    );
};

export default ContactInfo;
