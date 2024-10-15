"use client";

import React, { useState } from 'react';
import styles from '@/styles/saved-candidates.module.css';

const SavedCandidates: React.FC = () => {
    const [candidates] = useState([
        {
            id: 1,
            name: 'Guy Hawkins',
            title: 'Technical Support Specialist',
            profilePic: '/path/to/profile-pic1.jpg',
        },
        {
            id: 2,
            name: 'Jacob Jones',
            title: 'Product Designer',
            profilePic: '/path/to/profile-pic2.jpg',
        },
        {
            id: 3,
            name: 'Cameron Williamson',
            title: 'Marketing Officer',
            profilePic: '/path/to/profile-pic3.jpg',
        },
        {
            id: 4,
            name: 'Robert Fox',
            title: 'Marketing Manager',
            profilePic: '/path/to/profile-pic4.jpg',
        },
        {
            id: 5,
            name: 'Kathryn Murphy',
            title: 'Junior Graphic Designer',
            profilePic: '/path/to/profile-pic5.jpg',
        },
        // Add more candidates as needed
    ]);

    const handleActionClick = (candidateId: number, action: string) => {
        console.log(`Candidate ${candidateId} action: ${action}`);
    };

    return (
        <div className={styles.container}>
            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.header}>
                    <h2>Saved Candidates</h2>
                    <p className={styles.notice}>
                        <i className="fas fa-info-circle"></i> All of the candidates are visible until 24 March, 2021
                    </p>
                </div>

                {/* Candidates List */}
                <div className={styles.candidatesList}>
                    {candidates.map((candidate) => (
                        <div key={candidate.id} className={styles.candidateRow}>
                            <div className={styles.candidateProfile}>
                                <img
                                    src={candidate.profilePic}
                                    alt={`${candidate.name}'s profile picture`}
                                    className={styles.profilePic}
                                />
                                <div className={styles.candidateDetails}>
                                    <h4>{candidate.name}</h4>
                                    <p>{candidate.title}</p>
                                </div>
                            </div>
                            <div className={styles.candidateActions}>
                                <button className={styles.viewProfileButton}>
                                    View Profile
                                </button>
                                <div className={styles.moreActions}>
                                    <button className={styles.moreActionsButton}>⋮</button>
                                    <div className={styles.moreActionsMenu}>
                                        <button onClick={() => handleActionClick(candidate.id, 'email')}>Send Email</button>
                                        <button onClick={() => handleActionClick(candidate.id, 'download')}>Download CV</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SavedCandidates;
