// import React, { useState } from 'react';
// import styles from '@/styles/social-media-info.module.css';

// // Define the available social media platforms and their icons
// const socialMediaOptions = [
//     { label: 'Facebook', value: 'facebook', icon: '🌐' },
//     { label: 'Twitter', value: 'twitter', icon: '🐦' },
//     { label: 'Instagram', value: 'instagram', icon: '📷' },
//     { label: 'Youtube', value: 'youtube', icon: '🎥' },
// ];

// interface SocialMediaLink {
//     id: number;
//     platform: string;
//     url: string;
// }

// const SocialMediaInfo: React.FC = () => {
//     const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);

//     const addSocialLink = () => {
//         setSocialLinks((prev) => [
//             ...prev,
//             { id: prev.length + 1, platform: '', url: '' },
//         ]);
//     };

//     const removeSocialLink = (id: number) => {
//         setSocialLinks(socialLinks.filter((link) => link.id !== id));
//     };

//     const updateSocialLink = (id: number, updatedField: Partial<SocialMediaLink>) => {
//         setSocialLinks(socialLinks.map((link) =>
//             link.id === id ? { ...link, ...updatedField } : link
//         ));
//     };

//     const handleSave = () => {
//         // Save logic, can submit form data
//         console.log('Social Media Links:', socialLinks);
//     };

//     return (
//         <div className={styles.socialMediaContainer}>
//             <h3 className={styles.socialMediaTitle}>Social Media Profile</h3>

//             {socialLinks.map((link, index) => (
//                 <div key={link.id} className={styles.socialMediaRow}>
//                     <div className={styles.formGroup}>
//                         <label>Social Link {index + 1}</label>
//                         <select
//                             className={styles.selectInput}
//                             value={link.platform}
//                             onChange={(e) =>
//                                 updateSocialLink(link.id, {platform: e.target.value})
//                             }
//                         >
//                             <option value="">Select a platform</option>
//                             {socialMediaOptions.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className={styles.formGroup}>
//                         <input
//                             type="url"
//                             className={styles.inputText}
//                             placeholder="Profile link/url..."
//                             value={link.url}
//                             onChange={(e) =>
//                                 updateSocialLink(link.id, {url: e.target.value})
//                             }
//                         />
//                     </div>

//                     <button
//                         className={styles.removeButton}
//                         onClick={() => removeSocialLink(link.id)}
//                     >
//                         ❌
//                     </button>
//                 </div>
//             ))}

//             <button className={styles.addLinkButton} onClick={addSocialLink}>
//                 <i className="fa fa-plus"/> Add New Social Link
//             </button>

//             <button className={styles.saveButton} onClick={handleSave}>
//                 Save Changes
//             </button>
//         </div>
//     );
// };

// export default SocialMediaInfo;
"use client";

import React, { useState } from 'react';
import styles from '@/styles/social-media-info.module.css';
import { Share2, Plus, Trash2 } from 'lucide-react';

interface SocialMediaLink {
    id: number;
    platform: string;
    url: string;
}

const socialMediaOptions = [
    { label: 'Facebook', value: 'facebook' },
    { label: 'Twitter', value: 'twitter' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Youtube', value: 'youtube' },
];

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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <Share2 size={24} />
                </div>
                <div>
                    <h1 className={styles.title}>Social Media Profile</h1>
                    <p className={styles.description}>Connect your social media accounts</p>
                </div>
            </div>

            <div className={styles.content}>
                {socialLinks.map((link) => (
                    <div key={link.id} className={styles.linkRow}>
                        <select
                            className={styles.select}
                            value={link.platform}
                            onChange={(e) => updateSocialLink(link.id, {platform: e.target.value})}
                        >
                            <option value="">Select platform</option>
                            {socialMediaOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <input
                            type="url"
                            className={styles.input}
                            placeholder="Enter profile URL..."
                            value={link.url}
                            onChange={(e) => updateSocialLink(link.id, {url: e.target.value})}
                        />

                        <button
                            className={styles.removeButton}
                            onClick={() => removeSocialLink(link.id)}
                            aria-label="Remove link"
                        >
                            <Trash2 size={16} className={styles.trashIcon} />
                        </button>
                    </div>
                ))}

                <div className={styles.addLinkContainer}>
                    <button className={styles.addButton} onClick={addSocialLink}>
                        <Plus size={16} className={styles.plusIcon} />
                        Add Social Link
                    </button>
                </div>

                {socialLinks.length > 0 && (
                    <div className={styles.saveContainer}>
                        <button className={styles.saveButton}>
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialMediaInfo;