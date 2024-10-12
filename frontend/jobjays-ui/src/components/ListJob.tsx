// src/components/PostJob.tsx

import styles from '@/styles/listJob.module.css'; // Assuming you style it with CSS Modules
import { 
    sampleJobListing, sampleJobListingB, sampleJobListingC
} from "@/lib/data";
import { JobPost } from "@/lib/types";
import { fetchAllJobPosts } from "@/lib/api";
import { useState } from 'react';






const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US').format(salary);
}


const ListJob = () => {
    const { JobPosts, isLoading, isError, mutate} = fetchAllJobPosts();
    // const [jobListings, setJobListings] = useState<JobPost[]>(JobPosts);

    // Assuming they are JOBPOSTS
    if (isLoading) 
        return <div> Loading... </div>;
    if (isError) return <div>Error loading all job details.</div>;
    if (!JobPosts) return <div>Jobs not found.</div>;

    const activeJobListings = JobPosts.filter(job => job.status === 'Active');
    return (
        <div className={styles.jobListGrid}> 
            {activeJobListings.map((jobListing) => (
                <div key={jobListing.id} className={styles.jobBox}>
                    <h1>{jobListing.title}</h1>
                    <div className = {styles.flexContainer}>
                        <div className={styles.typeBox}>
                            <span className={styles.typeText}>{jobListing.type}</span>
                        </div> 
                        <p>{jobListing.location}</p>
                        <p>{"Salary: $" + formatSalary(jobListing.salary)}</p>
                    </div>
                </div>
            ))}
        </div>
            
        );
        
        // <div>
        //     {/* <h1>List Job Page</h1> */}
        //     <div key={sampleJobListing.jobID} className={styles.jobBox}>
        //         <h1>{sampleJobListing.title}</h1>
        //         <div className = {styles.flexContainer}>
        //             <div className={styles.typeBox}>
        //                 <span className={styles.typeText}>{sampleJobListing.type}</span>
        //             </div>
                    
        //             <p>{sampleJobListing.location}</p>
        //             <p>{"Salary: $" + formatSalary(sampleJobListing.salary)}</p>
        //         </div>
        //     </div>
            
                
        // </div>

};





export default ListJob;