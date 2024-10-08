"use client";  // Add this directive at the top

import React, {useEffect, useState } from 'react';
import styles from '@/styles/my-jobs.module.css';
import useSWR from "swr";
import {EmployerProfile, JobPost} from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function useUser(id: number) {
    {/* Makes a call to get an EmployerProfile and render jobPosts from there */}
    {/* Other calls from the JobPost Controller will be for applicants to see all jobs */}
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/companies/profile/${id}`, fetcher)

    return {
        EmployerProfile: data as EmployerProfile,
        isLoading,
        isError: error
    }
}
function calculateDaysRemaining(endDate: string): number {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

function addJobAttributes(job: JobPost): JobPost {
    // Assuming job has a `postingEndDate` attribute, calculate days remaining
    //console.log(typeof new Date(job.closedDate));
    const daysRemaining = calculateDaysRemaining(new Date(job.closedDate).toISOString());

    // Assign values for type and status as examples
    const jobType = job.type || 'Full Time'; // Default to Full Time if not available
    const jobStatus = daysRemaining > 0 ? 'Active' : 'Expired';

    return {
        ...job,
        daysRemaining,
        type: jobType,
        status: jobStatus
    };
}
interface MyJobsProps {
    id: string;
}
const MyJobs: React.FC<MyJobsProps> = ({id}) => {
    const { EmployerProfile, isLoading, isError} = useUser(Number(id));


    const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
    useEffect(() => {
        // Ensure EmployerProfile is not undefined or null
        if (EmployerProfile && EmployerProfile.jobPosts) {
            // Add additional attributes to each job post

            const updatedJobs = EmployerProfile.jobPosts.map(addJobAttributes);
            setJobPosts(updatedJobs);

            //setJobPosts(EmployerProfile.jobPosts);
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
                        <div key={job.jobID} className={styles.jobRow}>
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
                                        {job.status === 'Active' && (
                                            <button onClick={() => handleActionClick(job.jobID, 'promote')}>
                                                Promote Job
                                            </button>
                                        )}
                                        <button onClick={() => handleActionClick(job.jobID, 'view')}>View Detail</button>
                                        {job.status === 'Expired' && (
                                            <button onClick={() => handleActionClick(job.jobID, 'expire')}>
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
