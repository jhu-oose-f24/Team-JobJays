// import React from 'react';
// import styles from '@/styles/dashboard.module.css';
// import Link from "next/link";
//
// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div className={styles.dashboardContainer}>
//             {/* Sidebar */}
//             <aside className={styles.sidebar}>
//                 <h2>JobJays</h2>
//                 <nav className={styles.navMenu}>
//                     <Link href={"/dashboard"} className={styles.navItem}>
//                         </Link>
//                     <Link href={"/employer/profile"} className={styles.navItem}> My Profile</Link>
//                     <a href="#jobs" className={styles.navItem}>My Jobs</a>
//                     <a href="#post" className={styles.navItem}>Post a Job</a>
//                     <a href="#candidates" className={styles.navItem}>Saved Candidates</a>
//                     <a href="#questions" className={styles.navItem}>Custom Questions</a>
//                     {/*<a href="#plans" className={styles.navItem}>Plans & Billing</a>*/}
//                     {/*<a href="#message" className={styles.navItem}>Message</a>*/}
//                     <a href="#verify" className={styles.navItem}>Verify Account</a>
//                     <a href="#logout" className={styles.navItem}>Log Out</a>
//                 </nav>
//             </aside>
//
//             {/* Main Content */}
//             <main className={styles.mainContent}>
//                 {children} {/* Page-specific content will be rendered here */}
//             </main>
//         </div>
//     );
// };
//
// export default DashboardLayout;
// app/employer/layout.tsx
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
                <h2>Job Jays</h2>
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
