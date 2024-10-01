"use client";
import React, { useState } from 'react';
import styles from '@/styles/profile.module.css';
import Image from "next/image";
import SocialMediaInfo from "@/components/employer/SocialMediaInfo";
import AccountSettings from "@/components/candidate/AccountSettings";
import ProfileData from "@/components/candidate/Profile";

const ProfilePage: React.FC = () => {
    const [tab, setTab] = useState<'personal' | 'profile' | 'social-media' | 'account-setting'>('personal');

    const handleTabClick = (selectedTab: 'personal' | 'profile' | 'social-media' | 'account-setting') => {
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

                {/* Tab Content */}
                {tab === 'personal' && (
                    <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
                        <div className="space-y-4">
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 border border-dashed rounded flex justify-center items-center">
                                    <span className="text-gray-500">Browse photo</span>
                                </div>
                                <p className="text-gray-400">A photo larger than 400 pixels works best. Max size 5MB.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Full Name</label>
                                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Title/Headline</label>
                                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Experience</label>
                                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                                        <option>Select...</option>
                                        <option>1-3 years</option>
                                        <option>3-5 years</option>
                                        <option>5+ years</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Educations</label>
                                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                                        <option>Select...</option>
                                        <option>Bachelor's</option>
                                        <option>Master's</option>
                                        <option>PhD</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Personal Website</label>
                                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded" placeholder="Website url..." />
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
                        </div>
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

export default ProfilePage;
