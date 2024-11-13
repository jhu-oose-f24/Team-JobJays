"use client";  // Add this directive at the top

import React, {useEffect, useState} from 'react';
import styles from '@/styles/my-jobs.module.css';
import {getSavedJobs} from "@/lib/api";
import {useParams} from "next/navigation";
import SkeletonJobDetails from "@/components/jobPost/SkeletonJobDetails";
import Link from "next/link";
import {ApplicantProfile, JobPost} from "@/lib/types";

const FavoriteJobs: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the job ID from the route
    // const {ApplicantProfile, isLoading, isError} = getSavedJobs(Number(id));
    // const savedJobs = ApplicantProfile.savedJobs;
    // if (isLoading) return <SkeletonJobDetails/>;
    // if (isError) return <div>Error loading job details.</div>;
    // if (!savedJobs) return <div>Jobs not found.</div>;
    const [aP, setAP] = useState<ApplicantProfile>();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                if (id) {
                    const {ApplicantProfile, isLoading, isError} = getSavedJobs(Number(id));
                    setAP(ApplicantProfile);
                    if (isLoading) return <SkeletonJobDetails/>;
                }
            } catch (error) {
                return <div>Error loading job details</div>;
            }
        };

        fetchSavedJobs();
        }, [id]);



    if (!aP || !aP.savedJobs) return <div>No jobs found</div>

    const savedJobs = aP.savedJobs;




    return (
        <div className={styles.jobListGrid}>
            {savedJobs.map((jobListing) => (
                <Link
                    key={jobListing.id}
                    href={`http://localhost:3000/post/jobs/${jobListing.id}`}
                    className={styles.jobBox} // This applies styling to the entire box
                >
                    <div>
                        <h1>{jobListing.title}</h1>
                        <div className={styles.flexContainer}>
                            <div className={styles.typeBox}>
                                <span className={styles.typeText}>{jobListing.type}</span>
                            </div>
                            <div className="justify-between">
                                <p>Location: {jobListing.location.city},{jobListing.location.state},{jobListing.location.country} </p>
                                <p>Salary: ${jobListing.minSalary.toLocaleString()} - ${jobListing.maxSalary.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
    // return (
    //     <div className={styles.container}>
    //
    //         {/* Main Content */}
    //         <main className={styles.main}>
    //             <div className={styles.header}>
    //                 <h2>Favorite Jobs</h2>
    //                 <div className={styles.filter}>
    //                     <label htmlFor="jobStatus">Job status:</label>
    //                     <select
    //                         id="jobStatus"
    //                         value={jobStatusFilter}
    //                         onChange={handleStatusChange}
    //                     >
    //                         <option value="all">All Jobs</option>
    //                         <option value="active">Active</option>
    //                         <option value="expire">Expired</option>
    //                     </select>
    //                 </div>
    //             </div>
    //
    //             {/* Job List */}
    //             <div className={styles.jobList}>
    //                 {filteredJobs.map((job) => (
    //                     <div key={job.id} className={styles.jobRow}>
    //                         <div className={styles.jobDetails}>
    //                             <h4>{job.title}</h4>
    //                             <p>{job.type} &bull; {job.daysRemaining > 0 ? `${job.daysRemaining} days remaining` : 'Expired'}</p>
    //                         </div>
    //                         <div className={styles.jobStatus}>
    //                             {job.status === 'Active' ? (
    //                                 <span className={styles.activeStatus}>Active</span>
    //                             ) : (
    //                                 <span className={styles.expiredStatus}>Expired</span>
    //                             )}
    //                         </div>
    //                         <div className={styles.jobActions}>
    //                             <button className={styles.viewApplicationsButton}>
    //                                 View Detail
    //                             </button>
    //                             <div className={styles.moreActions}>
    //                                 <button className={styles.moreActionsButton}>⋮</button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //
    //             {/* Pagination */}
    //             <div className={styles.pagination}>
    //                 <button>&lt;</button>
    //                 <button className={styles.active}>01</button>
    //                 <button>02</button>
    //                 <button>03</button>
    //                 <button>04</button>
    //                 <button>05</button>
    //                 <button>&gt;</button>
    //             </div>
    //         </main>
    //     </div>
    // );
};

export default FavoriteJobs;
