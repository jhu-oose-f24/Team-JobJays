"use client";
import React from 'react';
import styles from '@/styles/dashboard.module.css';
import Link from "next/link";
import { useRouter, useParams } from "next/navigation"; // Use both from next/navigation

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
    const { candidate_id } = useParams();
    const router = useRouter(); // Initialize router from next/navigation

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2>Job Jays</h2>
                <nav className={styles.navMenu}>
                    <Link href={"/candidate/dashboard"} className={styles.navItem}> Overview</Link>
                    <Link href={"/candidate/appliedJobs"} className={styles.navItem}> Applied Jobs</Link>
                    <Link href={`/candidate/favoriteJobs`} className={styles.navItem}>Favorite Jobs</Link>
                    <Link href={`/candidate/jobAlerts`} className={styles.navItem}>Jobs Alerts</Link>
                    <Link href={`/candidate/settings`} className={styles.navItem}> Settings</Link>
                    <Link href={"/candidate/preference"} className={styles.navItem}> Preferences</Link>


                    <a href="#logout" onClick={() => {
                        localStorage.removeItem("candidateId");
                        router.push("/signin"); // Use router.push for navigation
                    }} className={styles.navItem}>Log Out</a>
                    <Link href={`/candidate/${candidate_id}/savedJobs`} className={styles.navItem}>Saved Jobs</Link>
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
