"use client";
import React, { useState } from 'react';
import styles from '@/styles/profile.module.css';
import Image from "next/image";
import FoundingInfo from "@/components/employer/FoundingInfo";
import SocialMediaInfo from "@/components/employer/SocialMediaInfo";
import AccountSettings from "@/components/employer/AccountSettings";

const ProfilePage: React.FC = () => {
    const [tab, setTab] = useState<'company-info' | 'founding-info' | 'social-media' | 'account-setting'>('company-info');

    const handleTabClick = (selectedTab: 'company-info' | 'founding-info' | 'social-media' | 'account-setting') => {
        setTab(selectedTab);
    };

    return (
        <div className={styles.profileContainer}>
            {/* Sidebar */}

            {/* Main Profile Content */}
            <main className={styles.mainContent}>
                <h3 className={styles.header}>Settings</h3>

                {/* Tabs Navigation */}
                <div className={styles.tabs}>
                    <button className={`${styles.tabButton} ${tab === 'company-info' ? styles.activeTab : ''}`} onClick={() => handleTabClick('company-info')}>
                        Company Info
                    </button>
                    <button className={`${styles.tabButton} ${tab === 'founding-info' ? styles.activeTab : ''}`} onClick={() => handleTabClick('founding-info')}>
                        Founding Info
                    </button>
                    <button className={`${styles.tabButton} ${tab === 'social-media' ? styles.activeTab : ''}`} onClick={() => handleTabClick('social-media')}>
                        Social Media Profile
                    </button>
                    <button className={`${styles.tabButton} ${tab === 'account-setting' ? styles.activeTab : ''}`} onClick={() => handleTabClick('account-setting')}>
                        Account Setting
                    </button>
                </div>

                {/* Tab Content */}
                {tab === 'company-info' && (
                    <div className={styles.tabContent}>
                        <div className={styles.logoBannerSection}>

                            <div>
                                <h4>Logo</h4>
                                <Image
                                    className={styles.image}
                                    src="/company_logo.png"
                                    alt="company_logo"
                                    width={200}
                                    height={200}
                                    layout="responsive"
                                />                                {/*<img src="/company_logo.png" alt="Logo" className={styles.image} />*/}
                                <p>3.5 MB <a href="#" className={styles.removeButton}>Remove</a> <a href="#" className={styles.replaceButton}>Replace</a></p>
                            </div>
                            <div>
                                <h4>Banner</h4>
                                <img src="/company_ban.png" alt="Banner" className={styles.imageBanner}/>
                                <p>4.3 MB <a href="#" className={styles.removeButton}>Remove</a> <a href="#" className={styles.replaceButton}>Replace</a></p>
                            </div>
                        </div>
                        <label>Company name</label>
                        <input type="text" placeholder="Company name" className={styles.inputField} />
                        <label>About us</label>
                        <textarea placeholder="Write down about your company here..." className={styles.textArea}></textarea>
                        <button className={styles.saveButton}>Save Change</button>
                    </div>
                )}

                {tab === 'founding-info' && (
                    <div className={styles.tabContent}>
                        <h4>Founding Info</h4>
                        <FoundingInfo /> {/* No submit button here */}
                    </div>
                )}

                {tab === 'social-media' && (
                    <div className={styles.tabContent}>
                        <h4>Social Media Profile</h4>
                        <SocialMediaInfo />
                    </div>
                )}

                {tab === 'account-setting' && (
                    <div className={styles.tabContent}>
                        <h4>Account Setting</h4>
                        <AccountSettings></AccountSettings>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
