import React, { useState } from 'react';
import styles from '@/styles/social-media-info.module.css';

// Define the available social media platforms and their icons
const socialMediaOptions = [
    { label: 'Facebook', value: 'facebook', icon: '🌐' },
    { label: 'Twitter', value: 'twitter', icon: '🐦' },
    { label: 'Instagram', value: 'instagram', icon: '📷' },
    { label: 'Youtube', value: 'youtube', icon: '🎥' },
];

interface SocialMediaLink {
    id: number;
    platform: string;
    url: string;
}

const SocialMediaInfo: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);

    const addSocialLink = () => {
        setSocialLinks((prev) => [
            ...prev,
            { id: prev.length + 1, platform: '', url: '' },
        ]);
    };

    const removeSocialLink = (id: number) => {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
    };

    const updateSocialLink = (id: number, updatedField: Partial<SocialMediaLink>) => {
        setSocialLinks(socialLinks.map((link) =>
            link.id === id ? { ...link, ...updatedField } : link
        ));
    };

    const handleSave = () => {
        // Save logic, can submit form data
        console.log('Social Media Links:', socialLinks);
    };

    return (
        <div className={styles.socialMediaContainer}>
            <h3 className={styles.socialMediaTitle}>Social Media Profile</h3>

            {socialLinks.map((link, index) => (
                <div key={link.id} className={styles.socialMediaRow}>
                    <div className={styles.formGroup}>
                        <label>Social Link {index + 1}</label>
                        <select
                            className={styles.selectInput}
                            value={link.platform}
                            onChange={(e) =>
                                updateSocialLink(link.id, {platform: e.target.value})
                            }
                        >
                            <option value="">Select a platform</option>
                            {socialMediaOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="url"
                            className={styles.inputText}
                            placeholder="Profile link/url..."
                            value={link.url}
                            onChange={(e) =>
                                updateSocialLink(link.id, {url: e.target.value})
                            }
                        />
                    </div>

                    <button
                        className={styles.removeButton}
                        onClick={() => removeSocialLink(link.id)}
                    >
                        ❌
                    </button>
                </div>
            ))}

            <button className={styles.addLinkButton} onClick={addSocialLink}>
                <i className="fa fa-plus"/> Add New Social Link
            </button>

            <button className={styles.saveButton} onClick={handleSave}>
                Save Changes
            </button>
        </div>
    );
};

export default SocialMediaInfo;
