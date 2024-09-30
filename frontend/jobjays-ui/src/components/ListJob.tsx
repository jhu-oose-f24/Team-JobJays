// src/components/PostJob.tsx

import styles from '@/styles/listJob.module.css'; // Assuming you style it with CSS Modules
import { 
    sampleJobListing, sampleJobListingB, sampleJobListingC
} from "@/lib/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';





const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US').format(salary);
}

const jobListings = [sampleJobListing, sampleJobListingB, sampleJobListingC];

const ListJob = () => {
    return (
        <div className={styles.jobListGrid}> 
            {jobListings.map((jobListing) => (
                <div key={jobListing.jobID} className={styles.jobBox}>
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