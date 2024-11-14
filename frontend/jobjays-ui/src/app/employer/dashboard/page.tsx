"use client";
import React, {useEffect, useState} from 'react';
import styles from '@/styles/dashboard.module.css';
import useSWR from "swr";
import {fetcher, useEmployer} from "@/lib/api";
import ErrorPage from "@/components/ui/ErrorPage";
import {EmployerProfile} from "@/lib/types";

const DashboardPage: React.FC = () => {
    // const [token, setToken] = useState<string | null>(null);
    // // Retrieve `employerId` from localStorage on the client side
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const authToken = localStorage.getItem('token');
    //         if (authToken) {
    //             setToken(authToken);
    //         }
    //     }
    // }, []);

    const { EmployerProfile, isLoading, isError } = useEmployer();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading employer profile.</div>;
    return (
        <div>
            <header className={styles.dashboardHeader}>
                <h3>Hello, {EmployerProfile.name}</h3>
                <div className={styles.statsOverview}>
                    <div className={styles.statBox}>
                        <p>{EmployerProfile.jobPostsSize}</p>
                        <span>Jobs</span>
                    </div>
                    <div className={styles.statBox}>
                        <p>5</p>
                        <span>Saved Candidates</span>
                    </div>
                    <div className={styles.statBox}>
                        <p>0</p>
                        <span>Pending Jobs</span>
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
