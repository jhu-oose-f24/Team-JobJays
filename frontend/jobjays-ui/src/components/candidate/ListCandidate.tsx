// // src/components/PostJob.tsx
// import styles from '@/styles/listJob.module.css'; // Assuming you style it with CSS Modules
// import { fetchAllJobPosts } from "@/lib/api";
// import Link from "next/link";
//
// interface ListJobProps {
//     query: string;  // Accept the query as a prop
// }
//
// const ListJob = ({query}: ListJobProps) => {
//     const { JobPosts, isLoading, isError} = fetchAllJobPosts();
//
//     if (isLoading)
//         return <div> Loading... </div>;
//     if (isError) return <div>Error loading all job details.</div>;
//     if (!JobPosts) return <div>Jobs not found.</div>;
//
//     const activeJobListings = JobPosts.filter(job => job.status === 'Active');
//     const filteredJobListings = query
//         ? activeJobListings.filter(job =>
//             job.title.toLowerCase().includes(query.toLowerCase()) ||
//             job.description.toLowerCase().includes(query.toLowerCase()) ||
//             job.location.toLowerCase().includes(query.toLowerCase()) ||
//             job.companyName.toLowerCase().includes(query.toLowerCase())
//
//         )
//         : activeJobListings;
//     return (
//         <div className={styles.jobListGrid}>
//             {filteredJobListings.map((jobListing) => (
//                 <Link
//                     key={jobListing.id}
//                     href={`http://localhost:3000/post/jobs/${jobListing.id}`}
//                     className={styles.jobBox} // This applies styling to the entire box
//                 >
//                     <div>
//                         <h1>{jobListing.title}</h1>
//                         <div className={styles.flexContainer}>
//                             <div className={styles.typeBox}>
//                                 <span className={styles.typeText}>{jobListing.type}</span>
//                             </div>
//                             <div className="justify-between">
//                                 <p>{jobListing.location}</p>
//                                 <p>Salary: ${jobListing.minSalary.toLocaleString()} - ${jobListing.maxSalary.toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
//
// };
//
//
//
//
//
// export default ListJob;

// src/components/PostJob.tsx
import styles from '@/styles/listJob.module.css'; // Assuming you style it with CSS Modules
import {fetchAllJobPosts, useAllApplicants} from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";
import {Applicant} from "@/lib/types"; // Import Suspense

interface ListCandidateProps {
    query: string;  // Accept the query as a prop
}

const ListCandidate = ({ query }: ListCandidateProps) => {
    const { applicants, isLoading, isError } = useAllApplicants();

    if (query === "EMPLOYERS" || query === "JOBS") {
        return <div></div>;
    }
    if (query === "CANDIDATES") { query = "";}
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading all job details.</div>;
    if (!applicants) return <div>Jobs not found.</div>;

    // const activeJobListings = JobPosts.filter(job => job.status === 'Active');


    const filteredApplicants: Applicant[] = query
        ? applicants.filter(applicant =>
            applicant.username.toLowerCase().includes(query.toLowerCase()) ||
            applicant.applicantProfile.name.toLowerCase().includes(query.toLowerCase()) ||
            applicant.applicantProfile.bio.toLowerCase().includes(query.toLowerCase())
        )
        : applicants;

    return (
        <div className={styles.jobListGrid}>
            {filteredApplicants.map((applicant) => (
                <Link
                    key={applicant.applicantId}
                    href={`/profile/applicants/${applicant.username}`} //username
                    className={styles.jobBox} // This applies styling to the entire box
                >
                    <div>
                        <h1>{applicant.applicantProfile.name}</h1>
                        <div className={styles.flexContainer}>
                            {/*<div className={styles.typeBox}>*/}
                            {/*    <span className={styles.typeText}>{company.employerProfile.bio}</span>*/}
                            {/*</div>*/}
                            <div className="justify-between">
                                <p>{applicant.applicantProfile.bio}</p>
                                <p>Experience: {applicant.applicantProfile.experience}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

const SuspenseCandidate = ({query}: ListCandidateProps) => {
    return (
        <Suspense fallback={<div>Loading candidates...</div>}>
            <ListCandidate query={query}/>
        </Suspense>
    );
};

export default SuspenseCandidate;
