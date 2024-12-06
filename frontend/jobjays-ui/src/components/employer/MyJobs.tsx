"use client";  // Add this directive at the top

import React, {useEffect, useState } from 'react';
import styles from '@/styles/my-jobs.module.css';

import {EmployerProfile, JobPost} from "@/lib/types";
import {addJobAttributes, updateJobPost, useEmployer} from '@/lib/api';
import { useParams } from 'next/navigation';
import Link from "next/link";
import {useRouter} from "next/navigation";
import SkeletonMyJobs from "@/components/employer/SkeletonMyJobs";
import ErrorPage from "@/components/ui/ErrorPage";
import {useToast} from "@/hooks/use-toast";


const MyJobs: React.FC = () => {
    const { EmployerProfile, isLoading, isError, mutate} = useEmployer();
    const {toast} = useToast();

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


    const handleViewJobDetail = (jobId: number) => {
        router.push(`/post/jobs/${jobId}`);
    }

    const handleViewApplications = (jobId: number) => {
        router.push(`/employer/view-applicants/${jobId}`);
    }

    const handleExpiration = async (job: JobPost) => {
        const data = {
            closedDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
        }
        const originalJob = EmployerProfile.jobPosts.find((j) => j.id === job.id);

        if (originalJob) {
            const updatedJob = {...originalJob, ...data};
            const index = EmployerProfile.jobPosts.findIndex((j) => j.id === updatedJob.id);
            if (index > -1) {
                EmployerProfile.jobPosts[index] = updatedJob;
            }
            const response = await updateJobPost(job.id, data, updatedJob, mutate);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Job closed!",
                    variant: "default",
                });

            } else {
                toast({
                    title: "Error",
                    description: "Job failed to be updated",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Error",
                description: "Job failed to be updated: Could not be found",
                variant: "destructive",
            });
        }
    }


    if (isLoading) return <SkeletonMyJobs />;
    if (isError) return <ErrorPage/>;

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
                                <p>{job.workTiming} &bull; {job.daysRemaining > 0 ? `${job.daysRemaining} days remaining` : 'Expired'}</p>
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
                                <button
                                    onClick={() => handleViewApplications(job.id)}
                                    className={styles.viewApplicationsButton}>
                                    View Applications
                                </button>
                                <div className={styles.moreActions}>
                                    <button className={styles.moreActionsButton}>⋮</button>
                                    <div className={styles.moreActionsMenu}>
                                        {/*{job.status === 'Active' && (*/}
                                        {/*    <button onClick={() => handleActionClick(job.id, 'promote')}>*/}
                                        {/*        Promote Job*/}
                                        {/*    </button>*/}
                                        {/*)}*/}
                                        <button onClick={() => handleViewJobDetail(job.id)}>View Detail</button>
                                        {job.status === 'Active' && (
                                            <button onClick={() => handleExpiration(job)}>
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
