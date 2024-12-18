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
import { fetchAllJobPosts } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react"; // Import Suspense

interface ListJobProps {
    query: string;  // Accept the query as a prop
}

const ListJob = ({ query }: ListJobProps) => {
    const { JobPosts, isLoading, isError } = fetchAllJobPosts();

    if (query === "EMPLOYERS" || query === "CANDIDATES") {
        return <div></div>;
    }
    if (query === "JOBS") { query = "";}
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading all job details.</div>;
    if (!JobPosts) return <div>Jobs not found.</div>;

    const activeJobListings = JobPosts.filter(job => job.status === 'Active');
    //const activeJobListings = JobPosts;

    const filteredJobListings = query
        ? activeJobListings.filter(job =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.description.toLowerCase().includes(query.toLowerCase()) ||
            job.location.city.toLowerCase().includes(query.toLowerCase()) ||
            job.location.state.toLowerCase().includes(query.toLowerCase()) ||
            job.location.country.toLowerCase().includes(query.toLowerCase()) ||
            job.companyName.toLowerCase().includes(query.toLowerCase())
        )
        : activeJobListings;

    return (
        <div className={styles.jobListGrid}>
            {filteredJobListings.map((jobListing) => (
                <Link
                    key={jobListing.id}
                    href={`/post/jobs/${jobListing.id}`}
                    className={styles.jobBox} // This applies styling to the entire box
                >
                    <div>
                        <h1>{jobListing.title}</h1>
                        <div className={styles.flexContainer}>
                            <div className={styles.typeBox}>
                                <span className={styles.typeText}>{jobListing.workTiming}</span>
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
};

const SuspenseListJob = ({ query }: ListJobProps) => {
    return (
        <Suspense fallback={<div>Loading job posts...</div>}>
            <ListJob query={query} />
        </Suspense>
    );
};

export default SuspenseListJob;
