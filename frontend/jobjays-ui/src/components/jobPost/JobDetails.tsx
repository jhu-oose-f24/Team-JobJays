"use client";
import React, {useState} from 'react';
import {useParams} from "next/navigation";
import {applyToJob, fetchJobPost, saveJob, updateJobPost} from "@/lib/api";
import JobForm from "@/components/employer/JobForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useToast} from "@/hooks/use-toast";
import SkeletonJobDetails from "@/components/jobPost/SkeletonJobDetails";


import { Button } from "@/components/ui/button"

const JobDetails = () => {
    //perhaps we can get User and check if they are logged in and if they are the employer of this post,
    //then we can show the edit button
    const { id } = useParams<{ id: string }>(); // Get the job ID from the route
    const { JobPost, isLoading, isError, mutate } = fetchJobPost(Number(id));
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const  handleJobFormSubmit = async (data: any) => {
        //We need to send the filteredData with proper attributes to backend for now until we have type in backend
        const {jobType, ...filteredData} = data;
        JobPost.type = data.type;
        const result = await updateJobPost(Number(id), filteredData, mutate, data);
        if (result.success) {
            setOpen(false);
            toast({
                title: "Success",
                description: "Job details updated successfully!",
                variant: "default",
            });
        } else {
            toast({
                title: "Error",
                description: `Failed to update job. Message: ${result.error.message}, Code: ${result.error.status}`,
                variant: "destructive",
            });
        }
    }

    const handleApply = async () => {
        console.log("Hello", id);
        //const applicantId = 1; //TODO replace hardcoded 1 with actual applicant id
        const result = await applyToJob(Number(id));
        if (result.success) {
            toast({
                title: "Success",
                description: "Application submitted successfully!",
                variant: "default",
            });
        } else {
            toast({
                title: "Error",
                description: `Failed to apply for job. Message: ${result.error.message}, Code: ${result.error.status}`,
                variant: "destructive",
            });
        }
    }

    const handleSave = async () => {
        const result = await saveJob(Number(id));
        if (result.success) {
            toast({
                title: "Success",
                description: "Job saved successfully!",
                variant: "default",
            });
        } else {
            toast({
                title: "Error",
                description: `Failed to save job. Message: ${result.error.message}, Code: ${result.error.status}`,
                variant: "destructive",
            });
        }
    }

    if (isLoading) return <SkeletonJobDetails/>;
    if (isError) return <div>Error loading job details.</div>;
    if (!JobPost) return <div>Job not found.</div>;

    //const [savedJobs, setSavedJobs] = useState<JobPost[]>([]);

    // const handleSubmit = () => {
    //     setSavedJobs((prev) => [...prev, JobPost]);
    // }



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
                    {/*    <button>Save</button>*/}
                    {/*)}*/}
                    <div className="flex flex-col space-y-2">
                        <button onClick={handleApply}
                                className="px-4 py-2 bg-blue-400 text-white rounded-md">Apply Now</button>
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
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-400 text-white rounded-md">Save Job</button>
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
                        <li>Location: {JobPost.location.city},{JobPost.location.state},{JobPost.location.country} </li>
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