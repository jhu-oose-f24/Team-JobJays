"use client";  // Add this directive at the top

import React, {useEffect, useState } from 'react';
import styles from '@/styles/my-jobs.module.css';
import {JobPost} from "@/lib/types";
import {addJobAttributes, useEmployer} from '@/lib/api';

import {useRouter} from "next/navigation";
import SkeletonMyJobs from "@/components/employer/SkeletonMyJobs";


const MyJobs: React.FC = () => {
    const { EmployerProfile, isLoading, isError} = useEmployer();
    const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (EmployerProfile && EmployerProfile.jobPosts) {
            // Add additional attributes to each job post using the addJobAttributes function
            const updatedJobs = EmployerProfile.jobPosts.map(addJobAttributes);
            if (JSON.stringify(updatedJobs) !== JSON.stringify(jobPosts)) {
                setJobPosts(updatedJobs);
            }

        }
    }, [EmployerProfile]);

    const [jobStatusFilter, setJobStatusFilter] = useState('all');
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setJobStatusFilter(event.target.value);
    };
    const filteredJobs: JobPost[] = jobPosts.filter((job) =>
        jobStatusFilter === 'all' ? true : job.status.toLowerCase() === jobStatusFilter

    );


    const handleActionClick = (jobId: number, action: string) => {
        console.log(`Job ${jobId} action: ${action}`);

    };

    const handleViewJobDetail = (jobId: number) => {
        router.push(`/post/jobs/${jobId}`);
    }


    if (isLoading) return <SkeletonMyJobs />;
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
                                <p>{job.numApplicants} Applications</p>
                            </div>
                            <div className={styles.jobActions}>
                                <button className={styles.viewApplicationsButton}>
                                    View Applications
                                </button>
                                <div className={styles.moreActions}>
                                    <button className={styles.moreActionsButton}>⋮</button>
                                    <div className={styles.moreActionsMenu}>
                                        {job.status === 'Active' && (
                                            <button onClick={() => handleActionClick(job.id, 'promote')}>
                                                Promote Job
                                            </button>
                                        )}
                                        <button onClick={() => handleViewJobDetail(job.id)}>View Detail</button>
                                        {job.status === 'Active' && (
                                            <button onClick={() => handleActionClick(job.id, 'expire')}>
                                                Make it Expire
                                            </button>
                                        )}
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
