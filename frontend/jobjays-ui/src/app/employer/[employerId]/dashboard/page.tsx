"use client";
import React from 'react';
import styles from '@/styles/dashboard.module.css';
import { useUser } from '@/lib/api';



interface DashboardPageProps {
    params: {
        employerId: string;
    };
}
const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
    const { EmployerProfile, isLoading, isError } = useUser(Number(params.employerId));

    const getImpressions = async () => {
        const response = await fetch(`http://localhost:8080/api/metrics/impressions/502`);
        if (!response.ok) {
            throw new Error('Network Error');
        }
        else {
            return response.json();
        }

    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;
    return (
        <div>
            <header className={styles.dashboardHeader}>
                <h3>Hello, {EmployerProfile.name}</h3>
                <div className={styles.statsOverview}>
                    <div className={styles.statBox}>
                        <p>{EmployerProfile.jobPostsSize}</p>
                        <span>Open Jobs</span>
                    </div>
                    <div className={styles.statBox}>
                        <p>5</p>
                        <span>Saved Candidates</span>
                    </div>
                    <div
                        onClick={getImpressions}
                        className={styles.statBox}>
                        <p>0</p>
                        <span>Impressions</span>
                    </div>
                </div>
            </header>

            <section className={styles.planOverview}>
                <div className={styles.planBox}>
                    <p>Active Jobs</p>
                    <span>20</span>
                    <a href="#upgrade">Upgrade Plan</a>
                </div>
                <div className={styles.planBox}>
                    <p>Highlight Jobs</p>
                    <span>4</span>
                </div>
                <div className={styles.planBox}>
                    <p>Featured Jobs</p>
                    <span>8</span>
                </div>
                <div className={styles.planBox}>
                    <p>Profile Views</p>
                    <span>20</span>
                </div>
            </section>

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

export default DashboardPage;
