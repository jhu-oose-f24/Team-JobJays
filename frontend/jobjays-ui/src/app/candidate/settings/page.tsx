"use client";
import React, { useState } from 'react';
import styles from '@/styles/profile.module.css';
import Image from "next/image";
import SocialMediaInfo from "@/components/employer/SocialMediaInfo";
import AccountSettings from "@/components/candidate/AccountSettings";
import ProfileData from "@/components/candidate/Profile";
import PersonalSettings from "@/components/candidate/PersonalSettings";

const ProfilePage: React.FC = () => {
    const [tab, setTab] = useState<'personal' | 'profile' | 'social-media' | 'account-setting'>('personal');

    const handleTabClick = (selectedTab: 'personal' | 'profile' | 'social-media' | 'account-setting') => {
        setTab(selectedTab);
    };

    return (
        <div className={styles.profileContainer}>
            <main className={styles.mainContent}>
                <h3 className={styles.header}>Settings</h3>
                {/* Tabs Navigation */}
                <div className={styles.tabs}>
                    <button className={`${styles.tabButton} ${tab === 'personal' ? styles.activeTab : ''}`} onClick={() => handleTabClick('personal')}>
                        Personal
                    </button>
                    <button className={`${styles.tabButton} ${tab === 'profile' ? styles.activeTab : ''}`} onClick={() => handleTabClick('profile')}>
                        Profile
                    </button>
                    <button className={`${styles.tabButton} ${tab === 'social-media' ? styles.activeTab : ''}`} onClick={() => handleTabClick('social-media')}>
                        Social Links
                    </button>
                    <button className={`${styles.tabButton} ${tab === 'account-setting' ? styles.activeTab : ''}`} onClick={() => handleTabClick('account-setting')}>
                        Account Setting
                    </button>
                </div>

                {tab === 'personal' && (
                    <div className={styles.tabContent}>
                        <h3>Profile</h3>
                        <PersonalSettings /> {/* No submit button here */}
                    </div>
                )}

                {tab === 'profile' && (
                    <div className={styles.tabContent}>
                        <h4>Profile</h4>
                        <ProfileData /> {/* No submit button here */}
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
export default  ProfilePage;