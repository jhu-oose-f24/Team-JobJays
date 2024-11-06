import React from 'react';
import styles from '@/styles/dashboard.module.css';
import useSWR from "swr";
import {fetcher} from "@/lib/api";
import ErrorPage from "@/components/ui/ErrorPage";

const DashboardPage: React.FC = () => {
    const employerId = localStorage.getItem('employerId') ? parseInt(localStorage.getItem('employerId') as string) : <ErrorPage/>;

    function useEmployerProfile() {
        const { data, error, isLoading } = useSWR(`http://localhost:8080/api/companies/profile/${employerId}`, fetcher);

        // Process job posts if data is available
        const processedEmployerProfile = data && data.jobPosts ? {
            ...data,
            jobPosts: data.jobPosts.map((job: JobPost) => addJobAttributes(job))
        } : data;

        return {
            EmployerProfile: processedEmployerProfile as EmployerProfile,
            isLoading,
            isError: error
        };
    }
    return (
        <div>
            <header className={styles.dashboardHeader}>
                <h3>Hello, Test Company</h3>
                <div className={styles.statsOverview}>
                    <div className={styles.statBox}>
                        <p>94</p>
                        <span>Open Jobs</span>
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
