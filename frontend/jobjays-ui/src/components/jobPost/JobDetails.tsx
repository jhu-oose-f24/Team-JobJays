"use client";
import React, {useState} from 'react';
import {useParams} from "next/navigation";
import {fetchJobPost, useUser} from "@/lib/api";
import JobForm from "@/components/jobPost/JobForm";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast} from "@/hooks/use-toast";



import { Button } from "@/components/ui/button"

const JobDetails = () => {
    //perhaps we can get User and check if they are logged in and if they are the employer of this post,
    //then we can show the edit button

    const { id } = useParams<{ id: string }>(); // Get the job ID from the route
    const { JobPost, isLoading, isError } = fetchJobPost(Number(id));
    const [open, setOpen] = useState(false);



    const handleJobFormSubmit = (data: any) => {
        console.log("Form submitted:", data);

        setOpen(false); // Close the dialog after submission
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading job details.</div>;
    if (!JobPost) return <div>Job not found.</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{JobPost.title}</h1>
                        <p className="text-gray-600">at {JobPost.companyName}</p>
                        <div className="flex space-x-2 mt-2">
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{JobPost.type}</span>
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Featured</span>
                        </div>
                    </div>
                    {/*/!* Conditionally render the "Edit" or "Apply" button based on user type *!/*/}
                    {/*{user?.role === 'Employer' && user.id === jobPost.employerId ? (*/}
                    {/*    <button>Edit Job Post</button>*/}
                    {/*) : (*/}
                    {/*    <button>Apply</button>*/}
                    {/*)}*/}
                    <div className="flex flex-col space-y-2">
                        <button className="px-4 py-2 bg-blue-400 text-white rounded-md">Apply Now</button>
                        <Dialog modal={false} open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setOpen(true)}
                                        className="px-4 py-2 bg-blue-400 text-white rounded-md">Edit Job
                                    Details</Button>
                            </DialogTrigger>
                            <DialogContent className="overflow-y-auto max-h-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Job Details</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    Enter details below
                                </DialogDescription>
                                <JobForm onSubmit={handleJobFormSubmit}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-bold">Job Description</h2>
                    <p className="mt-2">
                        {JobPost.description}
                    </p>
                    <ul className="list-disc list-inside mt-4">
                        <li>Great troubleshooting and analytical skills</li>
                        <li>3+ years of experience</li>
                        <li>Experience with HTML, JavaScript, CSS, PHP</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Salary and Job Overview */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold">Salary (USD)</h3>
                    <p className="text-xl font-bold">${JobPost.minSalary.toLocaleString()} -
                        ${JobPost.maxSalary.toLocaleString()}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold">Job Overview</h3>
                    <ul>
                        <li>Date posted: {(new Date(JobPost.postedDate)).toDateString()}</li>
                        <li>Experience: $50k-$60k/month</li>
                        <li>Job level: Entry Level</li>
                        <li>Location: {JobPost.location}</li>
                    </ul>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold">Share this job:</h3>
                    <div className="flex space-x-4 mt-2">
                        <button className="text-blue-600">Share on Facebook</button>
                        <button className="text-blue-500">Share on Twitter</button>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default JobDetails;

