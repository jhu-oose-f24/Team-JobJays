"use client";  // Add this directive at the top

import React, { useState } from 'react';
import styles from '@/styles/my-jobs.module.css';

const FavoriteJobs: React.FC = () => {
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

    const handleView = () => {
        console.log('View job detail');
    };

    return (
        <div className={styles.container}>

            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.header}>
                    <h2>Favorite Jobs</h2>
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
                            </div>
                            <div className={styles.jobActions}>
                                <button className={styles.viewApplicationsButton} onClick={handleView}>
                                    View Detail
                                </button>
                                <div className={styles.moreActions}>
                                    <button className={styles.moreActionsButton}>⋮</button>
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

export default FavoriteJobs;
