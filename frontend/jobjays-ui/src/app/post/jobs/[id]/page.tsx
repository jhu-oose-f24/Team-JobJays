"use client";
import React from 'react';
import JobDetails from "@/components/jobPost/JobDetails";
import RelatedJobs from "@/components/jobPost/RelatedJobs";
import { useParams } from "next/navigation";

const JobDetailPage: React.FC = () => {
    const { id } = useParams();
    return (
        <div className="bg-gray-100">
            <JobDetails />
            <RelatedJobs jobId={id}/>
        </div>
    );
};

export default JobDetailPage;