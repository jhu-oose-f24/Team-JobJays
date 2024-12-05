"use client";

import React from 'react';
import { useSimilarJobs } from '@/lib/api';
import { JobPost } from '@/lib/types';


const RelatedJobs= ({jobId} : {jobId: string | string[]}) => {
    // const jobs = [
    //     { title: "Technical Support Specialist", company: "Google Inc.", type: "Part-Time", salary: "$20,000 - $25,000" },
    //     { title: "Senior UX Designer", company: "Google Inc.", type: "Full-Time", salary: "$30,000 - $35,000" },
    //     { title: "Marketing Officer", company: "Google Inc.", type: "Internship", salary: "$20,000 - $25,000" },
    // ];
    // Fetch similar jobs based on salary (WILL CHANGE)
    const {jobList} = useSimilarJobs();

    if (!jobList || jobList.length === 0) {
        return <div className='text-gray-600'>No related jobs found</div>;
    }

    const topJobs = jobList
        .filter((job: JobPost) => job.id !== Number(jobId))
        .sort((a:any,b:any) => b.maxSalary - a.maxSalary)
        .slice(0, 3);


    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-bold">Related Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {topJobs.map((job: JobPost) => (
                    <div key={job.title} className="bg-white shadow-lg rounded-lg p-4">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.companyName}</p>
                        <p className="mt-2">{job.jobType}</p>
                        <p className="mt-2 font-bold">{job.maxSalary}</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">View Job</button>
                    </div>
                ))}
            </div>
        </div>
    );
};




export default RelatedJobs;
