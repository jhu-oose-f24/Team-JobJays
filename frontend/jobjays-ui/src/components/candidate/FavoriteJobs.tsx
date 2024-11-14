"use client";


import React from 'react';
import { useGetSavedJobs } from "@/lib/api";

import SkeletonJobDetails from "@/components/jobPost/SkeletonJobDetails";
import Link from "next/link";
import {ApplicantProfile, JobPost} from "@/lib/types";


const FavoriteJobs: React.FC = () => {

    const { savedJobs, isLoading, isError } = useGetSavedJobs();

    if (isLoading) return <SkeletonJobDetails />;
    if (isError) return <div>Error loading job details.</div>;
    if (!savedJobs || savedJobs.length === 0) return <div>No saved jobs found.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6">My Saved Jobs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map((jobListing) => (
                    <Link
                        key={jobListing.id}
                        href={`/post/jobs/${jobListing.id}`}
                        className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                    >
                        <h2 className="text-xl font-bold text-blue-600 mb-2">{jobListing.title}</h2>
                        <p className="text-gray-600 mb-4">{jobListing.description.slice(0, 100)}</p>
                        <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {jobListing.type}
                            </span>
                            <div className="text-right">
                                <p className="text-gray-700">
                                    {jobListing.location.city}, {jobListing.location.state}, {jobListing.location.country}
                                </p>
                                <p className="text-gray-700">
                                    Salary: ${jobListing.minSalary.toLocaleString()} - ${jobListing.maxSalary.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FavoriteJobs;

