'use client';
import React from 'react';
import styles from '@/styles/dashboard.module.css';
import Link from "next/link";
import { useParams } from "next/navigation";

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
    const { employerId } = useParams();
    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <Link href="/">
                    <img src="/JobJays_logo.png" alt="JobJays Logo" width={80}/>
                </Link>
                <Link href={`/`}><h2>Job Jays</h2></Link>
                <nav className={styles.navMenu}>
                    <Link href={`/employer/${employerId}/dashboard`} className={styles.navItem}> Overview
                    </Link>
                    <Link href={`/employer/${employerId}/profile`} className={styles.navItem}> My Profile</Link>

                    <Link href={`/employer/${employerId}/post-job`} className={styles.navItem}> Post a Job</Link>
                    <Link href={`/employer/${employerId}/my-jobs`} className={styles.navItem}>My Jobs</Link>
                    <Link href={`/employer/${employerId}/saved-candidates`} className={styles.navItem}> Saved Candidates</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children} {/* All child pages (dashboard, profile, etc.) will render here */}
            </main>
        </div>
    );
};

export default EmployerLayout;