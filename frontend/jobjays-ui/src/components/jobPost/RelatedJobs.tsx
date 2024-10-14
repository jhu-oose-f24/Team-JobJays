import React from 'react';

const RelatedJobs = () => {
    const jobs = [
        { title: "Technical Support Specialist", company: "Google Inc.", type: "Part-Time", salary: "$20,000 - $25,000" },
        { title: "Senior UX Designer", company: "Google Inc.", type: "Full-Time", salary: "$30,000 - $35,000" },
        { title: "Marketing Officer", company: "Google Inc.", type: "Internship", salary: "$20,000 - $25,000" },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-bold">Related Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {jobs.map((job, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="mt-2">{job.type}</p>
                        <p className="mt-2 font-bold">{job.salary}</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">View Job</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedJobs;
