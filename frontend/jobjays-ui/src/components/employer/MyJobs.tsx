"use client";  // Add this directive at the top

import React, { useState } from 'react';
import styles from '@/styles/my-jobs.module.css';
import useSWR from "swr";
import {EmployerProfile} from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function useUser(id: number) {
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/companies/profile/${id}`, fetcher)

    return {
        EmployerProfile: data as EmployerProfile,
        isLoading,
        isError: error
    }
}
function useEmployerJobs() {}
interface MyJobsProps {
    id: string;
}
const MyJobs: React.FC<MyJobsProps> = ({id}) => {
    const { EmployerProfile, isLoading, isError} = useUser(Number(id));
    const [jobStatusFilter, setJobStatusFilter] = useState('all');
    const [jobs] = useState([
        {
            id: 1,
            title: 'UI/UX Designer',
            type: 'Full Time',
            status: 'Active',
            applications: 798,
            daysRemaining: 27,
        },
        {
            id: 2,
            title: 'Senior UX Designer',
            type: 'Internship',
            status: 'Active',
            applications: 185,
            daysRemaining: 8,
        },
        {
            id: 3,
            title: 'Junior Graphic Designer',
            type: 'Full Time',
            status: 'Active',
            applications: 583,
            daysRemaining: 24,
        },
        {
            id: 4,
            title: 'Front End Developer',
            type: 'Full Time',
            status: 'Expire',
            applications: 740,
            daysRemaining: -1,
        },
        {
            id: 5,
            title: 'Technical Support Specialist',
            type: 'Part Time',
            status: 'Active',
            applications: 556,
            daysRemaining: 4,
        },
        // Add more job objects as needed
    ]);


    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setJobStatusFilter(event.target.value);
    };

    const filteredJobs = jobs.filter((job) =>
        jobStatusFilter === 'all' ? true : job.status.toLowerCase() === jobStatusFilter
    );

    const handleActionClick = (jobId: number, action: string) => {
        console.log(`Job ${jobId} action: ${action}`);
    };
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data.</div>;

    return (
        <div className={styles.container}>

            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.header}>
                    <h2>My Jobs</h2>
                    <span className={styles.jobCount}>{EmployerProfile.jobPostsSize}</span>
                    <div className={styles.filter}>
                        <label htmlFor="jobStatus">Job status:</label>
                        <select
                            id="jobStatus"
                            value={jobStatusFilter}
                            onChange={handleStatusChange}
                        >
                            <option value="all">All Jobs</option>
                            <option value="active">Active</option>
                            <option value="expire">Expired</option>
                        </select>
                    </div>
                </div>

                {/* Job List */}
                <div className={styles.jobList}>
                    {filteredJobs.map((job) => (
                        <div key={job.id} className={styles.jobRow}>
                            <div className={styles.jobDetails}>
                                <h4>{job.title}</h4>
                                <p>{job.type} &bull; {job.daysRemaining > 0 ? `${job.daysRemaining} days remaining` : 'Expired'}</p>
                            </div>
                            <div className={styles.jobStatus}>
                                {job.status === 'Active' ? (
                                    <span className={styles.activeStatus}>Active</span>
                                ) : (
                                    <span className={styles.expiredStatus}>Expired</span>
                                )}
                                <p>{job.applications} Applications</p>
                            </div>
                            <div className={styles.jobActions}>
                                <button className={styles.viewApplicationsButton}>
                                    View Applications
                                </button>
                                <div className={styles.moreActions}>
                                    <button className={styles.moreActionsButton}>⋮</button>
                                    <div className={styles.moreActionsMenu}>
                                        <button onClick={() => handleActionClick(job.id, 'promote')}>Promote Job</button>
                                        <button onClick={() => handleActionClick(job.id, 'view')}>View Detail</button>
                                        <button onClick={() => handleActionClick(job.id, 'expire')}>Make it Expire</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>
                    <button>&lt;</button>
                    <button className={styles.active}>01</button>
                    <button>02</button>
                    <button>03</button>
                    <button>04</button>
                    <button>05</button>
                    <button>&gt;</button>
                </div>
            </main>
        </div>
    );
};

export default MyJobs;
