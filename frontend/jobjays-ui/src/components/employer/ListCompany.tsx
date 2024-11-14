// src/components/PostJob.tsx
"use client";
import styles from '@/styles/listJob.module.css'; // Assuming you style it with CSS Modules
import {
    sampleJobListing, sampleJobListingB, sampleJobListingC
} from "@/lib/data";
import {Employer, JobPost} from "@/lib/types";
import {fetchAllCompanies, fetchAllJobPosts} from "@/lib/api";
import { useState } from 'react';
import Link from "next/link";

interface ListCompanyProps {
    query: string;  // Accept the query as a prop
}

const ListCompany = ({query}: ListCompanyProps) => {
    const { Employers, isLoading, isError} = fetchAllCompanies();

    if (query === "JOBS" || query === "CANDIDATES") {
        return <div></div>;
    }
    if (query === "EMPLOYERS") { query = "";}
    if (isLoading) return <div> Loading... </div>;
    if (isError) return <div>Error loading all employer details.</div>;
    if (!Employers) return <div>Employers not found.</div>;
    //TODO can use a skeleton here and render the amount of Employers.length
    const filteredEmployers = query
        ? Employers.filter(company =>
            company.username.toLowerCase().includes(query.toLowerCase()) ||
            company.employerProfile.name.toLowerCase().includes(query.toLowerCase()) ||
            company.employerProfile.bio.toLowerCase().includes(query.toLowerCase())
        )
        : Employers;
    return (
        <div className={styles.jobListGrid}>
            {filteredEmployers.map((company) => (
                <Link
                    key={company.employer_id}
                    href={`/profile/employers/${company.employer_id}`}
                    className={styles.jobBox} // This applies styling to the entire box
                >
                    <div>
                        <h1>{company.employerProfile.name}</h1>
                        <div className={styles.flexContainer}>
                            {/*<div className={styles.typeBox}>*/}
                            {/*    <span className={styles.typeText}>{company.employerProfile.bio}</span>*/}
                            {/*</div>*/}
                            <div className="justify-between">
                                <p>{company.employerProfile.bio}</p>
                                <p>Jobs: {company.employerProfile.jobPostsSize}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

    );

};





export default ListCompany;