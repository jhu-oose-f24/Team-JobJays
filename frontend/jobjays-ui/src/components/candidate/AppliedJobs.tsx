"use client";

import React from 'react';
import { useApplicant, addJobAttributes } from "@/lib/api";
import Link from 'next/link';

const AppliedJobs: React.FC = () => {
    // Retrieve applicantId from localStorage

    // Fetch applicant profile
    const { applicantProfile, isLoading, isError } = useApplicant();

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading applicant data.</div>;
    if (!applicantProfile) return <div>No applicant profile found.</div>;

    const appliedJobs = applicantProfile.appliedJobs || [];

    // Handle case when no applied jobs
    if (appliedJobs.length === 0) {
        return <div>You have not applied to any jobs yet.</div>;
    }

    // Process applied jobs to add additional attributes
    const processedAppliedJobs = appliedJobs.map((job) => addJobAttributes(job));

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Applied Jobs</h2>
            {/* Job List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedAppliedJobs.map((job) => (
                    <Link
                        key={job.id}
                        href={`/post/jobs/${job.id}`}
                        className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                    >
                        {/* Job Title */}
                        <h2 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h2>
                        {/* Job Description Preview */}
                        <p className="text-gray-600 mb-4">{job.description.slice(0, 100)}</p>
                        {/* Job Details */}
                        <div className="flex items-center justify-between">
                            {/* Job Type Bubble */}
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {job.type}
                            </span>
                            {/* Location and Salary */}
                            <div className="text-right">
                                <p className="text-gray-700">
                                    {job.location.city}, {job.location.state}, {job.location.country}
                                </p>
                                <p className="text-gray-700">
                                    Salary: ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AppliedJobs;