"use client";
import React from 'react';
import styles from '@/styles/dashboard.module.css';
import { useApplicant } from '@/lib/api';

interface DashboardPageProps {
    params: {
        candidate_id: string;
    };
}

const ApplicantDashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
    
    const { applicantProfile, isLoading, isError } = useApplicant(Number(params.candidate_id));

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;
    if (!applicantProfile) return <p>No data available</p>;


    return (
        <div>
            <header className={styles.dashboardHeader}>
                <h3>Hello, {applicantProfile.name}</h3>
                <div className={styles.statsOverview}>
                    <div className={styles.statBox}>
                        <p>{applicantProfile.bio}</p>
                        <span>Bio</span>
                    </div>
                    <div className={styles.statBox}>
                        <p>0</p>
                        <span>Applied Jobs</span>
                    </div>
                </div>
            </header>

            <section className={styles.jobList}>
                <h4>Recent Jobs</h4>
                <table className={styles.jobTable}>
                    <thead>
                    <tr>
                        <th>Job</th>
                        <th>Status</th>
                        <th>Applications</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Frontend Developer</td>
                        <td className={styles.status}>Active</td>
                        <td>3 Applications</td>
                        <td><a href="#view" className={styles.actionButton}>View Applications</a></td>
                    </tr>
                    <tr>
                        <td>MERN Stack Developer</td>
                        <td className={styles.status}>Active</td>
                        <td>1 Application</td>
                        <td><a href="#view" className={styles.actionButton}>View Applications</a></td>
                    </tr>
                    <tr>
                        <td>UI/UX Designer</td>
                        <td className={styles.status}>Active</td>
                        <td>2 Applications</td>
                        <td><a href="#view" className={styles.actionButton}>View Applications</a></td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ApplicantDashboardPage;
