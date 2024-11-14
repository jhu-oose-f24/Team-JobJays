"use client";
import ApplicantProfileCard from "@/components/ui/ApplicantProfileCard";
import { useEffect, useState } from "react";
import { JobPost } from "@/lib/types";


export default function ApplicantProfilePage() {
    const [savedJobs, setSavedJobs] = useState<JobPost[]>([]);

    useEffect(() => {
        fetch(`/api/applicants//profile/saved?id=${applicantId}`)
        .then((res) => res.json()).then((data:JobPost[]) => {setSavedJobs(data)});
    }, []);

    return (
    <div>
        <h2> Saved Jobs</h2>
        {savedJobs.map((jobPost) => (
            <div key={jobPost.id}>
                <h3>{jobPost.title}</h3>
                <p>{jobPost.description}</p>
            </div>
        ))}
        
    </div>
    )
}