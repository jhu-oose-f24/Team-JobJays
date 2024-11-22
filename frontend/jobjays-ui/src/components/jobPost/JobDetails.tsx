// "use client";
// import React, {useState} from 'react';
// import {useParams} from "next/navigation";
// import {
//     applyToJob,
//     createNewSaveCollection,
//     fetchJobPost,
//     saveJobToCollection,
//     updateJobPost,
//     useSavedJobCollections, useUserType,
// } from "@/lib/api";
// import JobForm from "@/components/employer/JobForm";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {useToast} from "@/hooks/use-toast";
// import SkeletonJobDetails from "@/components/jobPost/SkeletonJobDetails";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
//
//
//
// import { Button } from "@/components/ui/button"
// import {SavedJobCollection} from "@/lib/types";
//
// const JobDetails = () => {
//     const { id } = useParams<{ id: string }>();
//     const { JobPost, isLoading, isError, mutate } = fetchJobPost(Number(id));
//     const [open, setOpen] = useState(false);
//     const { userType, isLoading: typeLoading, isError: typeError} = useUserType();
//     if (userType == "applicant") {
//         const { Collections, isError: collectionError } = useSavedJobCollections();
//         const [openCreateDialog, setOpenCreateDialog] = useState(false);
//         const [newCollectionName, setNewCollectionName] = useState("");
//
//     }
//
//
//
//
//     const { toast } = useToast();
//
//     // Handle job form submission
//     const handleJobFormSubmit = async (data: any) => {
//         const result = await updateJobPost(Number(id), data, mutate, data);
//         if (result.success) {
//             setOpen(false); // Close the dialog
//             toast({
//                 title: "Success",
//                 description: "Job details updated successfully!",
//                 variant: "default",
//             });
//         } else {
//             toast({
//                 title: "Error",
//                 description: `Failed to update job. Message: ${result.error.message}, Code: ${result.error.status}`,
//                 variant: "destructive",
//             });
//         }
//     };
//
//     // Handle job application
//     const handleApply = async () => {
//         const result = await applyToJob(Number(id));
//         if (result.success) {
//             toast({
//                 title: "Success",
//                 description: "Application submitted successfully!",
//                 variant: "default",
//             });
//         } else {
//             toast({
//                 title: "Error",
//                 description: `Failed to apply for job. Message: ${result.error.message}, Code: ${result.error.status}`,
//                 variant: "destructive",
//             });
//         }
//     };
//
//     // Handle collection creation
//     const handleCreateCollection = async () => {
//         const result = await createNewSaveCollection(newCollectionName);
//         if (result.success) {
//             // @ts-ignore
//             const collectionId: number = result.data.id;
//             const saveResult = await saveJobToCollection(collectionId, Number(id));
//             if (saveResult.success) {
//                 toast({
//                     title: "Success",
//                     description: `Collection "${newCollectionName}" created successfully and job added!`,
//                     variant: "default",
//                 });
//             }
//         } else {
//             toast({
//                 title: "Error",
//                 description: `Failed to create collection. Message: ${result.error.message}`,
//                 variant: "destructive",
//             });
//         }
//         setNewCollectionName(""); // Reset input field
//         setOpenCreateDialog(false); // Close the create dialog
//     };
//
//     // Handle adding to collection
//     const handleAddToCollection = async (collectionId: number) => {
//         const result = await saveJobToCollection(collectionId, Number(id));
//         if (result.success) {
//             toast({
//                 title: "Success",
//                 description: "Job successfully added to collection!",
//                 variant: "default",
//             });
//         } else {
//             toast({
//                 title: "Error",
//                 description: `Failed to add job to collection. Message: ${result.error.message}`,
//                 variant: "destructive",
//             });
//         }
//     };
//
//     if (isLoading) return <SkeletonJobDetails />;
//     if (isError) return <div>Error loading job details.</div>;
//     if (!JobPost) return <div>Job not found.</div>;
//
//     //can fix the issue of an employer being able to see edit button on a job that is not theirs by
//     //checking if the job is in the viewing employer's job list
//     return (
//         <div className="container mx-auto px-4 py-6">
//             <div className="bg-white shadow-lg rounded-lg p-6">
//                 <div className="flex justify-between">
//                     <div>
//                         <h1 className="text-2xl font-bold">{JobPost.title} </h1>
//                         <p className="text-gray-600">at {JobPost.companyName}</p>
//                         <div className="flex space-x-2 mt-2">
//                             <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{JobPost.workTiming}</span>
//                             <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Featured</span>
//                         </div>
//                     </div>
//                     <div className="flex flex-col space-y-2">
//                         {collectionError ? (
//                             <Dialog open={open} onOpenChange={setOpen}>
//                                 <DialogTrigger asChild>
//                                     <Button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-400 text-white rounded-md">
//                                         Edit Job Details
//                                     </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="overflow-y-auto max-h-[500px]">
//                                     <DialogHeader>
//                                         <DialogTitle>Edit Job Details</DialogTitle>
//                                     </DialogHeader>
//                                     <DialogDescription>
//                                         Enter details below
//                                     </DialogDescription>
//                                     <JobForm onSubmit={handleJobFormSubmit} />
//                                 </DialogContent>
//                             </Dialog>
//                         ) : (
//                             <div className="flex flex-col space-y-2">
//                                 <button onClick={handleApply} className="px-4 py-2 bg-blue-400 text-white rounded-md">
//                                     Apply Now
//                                 </button>
//                                 <DropdownMenu>
//                                     <DropdownMenuTrigger asChild>
//                                         <Button className="px-4 py-2 bg-blue-400 text-white rounded-md">Save Job</Button>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent>
//                                         <DropdownMenuLabel>Collections</DropdownMenuLabel>
//                                         {Collections && Collections.length > 0 ? (
//                                             Collections.map((collection) => (
//                                                 <DropdownMenuItem
//                                                     key={collection.id}
//                                                     onSelect={() => {
//                                                         handleAddToCollection(collection.id);
//                                                         setOpenCreateDialog(false); // Ensure create dialog closes
//                                                     }}
//                                                 >
//                                                     {collection.name}
//                                                 </DropdownMenuItem>
//                                             ))
//                                         ) : (
//                                             <DropdownMenuItem disabled>No saved job collections found.</DropdownMenuItem>
//                                         )}
//                                         <DropdownMenuSeparator />
//                                         <Popover modal={false}>
//                                             <PopoverTrigger asChild>
//                                                 <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
//                                                 >Create a New Job Collection</div>
//
//                                             </PopoverTrigger>
//                                             <PopoverContent className="p-4 bg-white rounded-lg shadow-lg">
//                                                 <div className="space-y-4">
//                                                     <input
//                                                         type="text"
//                                                         value={newCollectionName}
//                                                         onChange={(e) => setNewCollectionName(e.target.value)}
//                                                         placeholder="Collection title"
//                                                         className="w-full border px-3 py-2 rounded-md"
//                                                     />
//                                                     <Button onClick={handleCreateCollection} className="px-4 py-2 bg-blue-400 text-white rounded-md">
//                                                         Add Collection
//                                                     </Button>
//                                                 </div>
//                                             </PopoverContent>
//                                         </Popover>
//                                     </DropdownMenuContent>
//                                 </DropdownMenu>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//
//
//
//                 <div className="mt-6">
//                     <h2 className="text-xl font-bold">Job Description</h2>
//                     <p className="mt-2">
//                         {JobPost.description}
//                     </p>
//                 </div>
//             </div>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 {/* Salary and Job Overview */}
//                 <div className="bg-white shadow-lg rounded-lg p-6">
//                     <h3 className="text-lg font-semibold">Salary (USD)</h3>
//                     <p className="text-xl font-bold">${JobPost.minSalary.toLocaleString()} -
//                         ${JobPost.maxSalary.toLocaleString()}</p>
//                 </div>
//
//                 <div className="bg-white shadow-lg rounded-lg p-6">
//                     <h3 className="text-lg font-semibold">Job Overview</h3>
//                     <ul>
//                         <li>Date posted: {(new Date(JobPost.postedDate)).toDateString()}</li>
//                         {/*<li>Experience: $50k-$60k/month</li>*/}
//                         {/*<li>Job level: Entry Level</li>*/}
//                         <li>Location: {JobPost.location.city},{JobPost.location.state},{JobPost.location.country} </li>
//                     </ul>
//                 </div>
//
//                 {/*<div className="bg-white shadow-lg rounded-lg p-6">*/}
//                 {/*    <h3 className="text-lg font-semibold">Share this job:</h3>*/}
//                 {/*    <div className="flex space-x-4 mt-2">*/}
//                 {/*        <button className="text-blue-600">Share on Facebook</button>*/}
//                 {/*        <button className="text-blue-500">Share on Twitter</button>*/}
//                 {/*    </div>*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     );
//
// };
// export default JobDetails;

"use client";
import React, {useEffect, useState} from "react";
import { useParams } from "next/navigation";
import {
    addImpressionEvent,
    applyToJob,
    createNewSaveCollection,
    fetchJobPost,
    saveJobToCollection,
    updateJobPost,
    useSavedJobCollections,
    useUserType,
} from "@/lib/api";
import JobForm from "@/components/employer/JobForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import SkeletonJobDetails from "@/components/jobPost/SkeletonJobDetails";
import { Button } from "@/components/ui/button";

const ApplicantView = ({ jobId }: { jobId: number }) => {
    const { Collections, isError } = useSavedJobCollections();
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        addImpressionEvent(jobId);
    }, [jobId]);

    // Handle job application
    const handleApply = async () => {
        const result = await applyToJob(jobId);
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
    };

    // Handle collection creation
    const handleCreateCollection = async () => {
        const result = await createNewSaveCollection(newCollectionName);
        if (result.success) {
            // @ts-ignore
            const collectionId = result.data.id;
            const saveResult = await saveJobToCollection(collectionId, jobId);
            if (saveResult.success) {
                toast({
                    title: "Success",
                    description: `Collection "${newCollectionName}" created and job added!`,
                    variant: "default",
                });
            }
        } else {
            toast({
                title: "Error",
                description: `Failed to create collection. Message: ${result.error.message}`,
                variant: "destructive",
            });
        }
        setNewCollectionName("");
        setOpenCreateDialog(false);
    };

    // Handle adding to collection
    const handleAddToCollection = async (collectionId: number) => {
        const result = await saveJobToCollection(collectionId, jobId);
        if (result.success) {
            toast({
                title: "Success",
                description: "Job added to collection!",
                variant: "default",
            });
        } else {
            toast({
                title: "Error",
                description: `Failed to add job. Message: ${result.error.message}`,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <button onClick={handleApply} className="px-4 py-2 bg-blue-400 text-white rounded-md">
                Apply Now
            </button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="px-4 py-2 bg-blue-400 text-white rounded-md">Save Job</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Collections</DropdownMenuLabel>
                    {Collections && Collections.length > 0 ? (
                        Collections.map((collection) => (
                            <DropdownMenuItem
                                key={collection.id}
                                onSelect={() => {
                                    handleAddToCollection(collection.id);
                                    setOpenCreateDialog(false); // Ensure create dialog closes
                                }}
                            >
                                {collection.name}
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem disabled>No saved job collections found.</DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator/>
                    <Popover modal={false}>
                        <PopoverTrigger asChild>
                            <div
                                className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
                            >Create a New Job Collection
                            </div>

                        </PopoverTrigger>
                        <PopoverContent className="p-4 bg-white rounded-lg shadow-lg">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newCollectionName}
                                    onChange={(e) => setNewCollectionName(e.target.value)}
                                    placeholder="Collection title"
                                    className="w-full border px-3 py-2 rounded-md"
                                />
                                <Button onClick={handleCreateCollection}
                                        className="px-4 py-2 bg-blue-400 text-white rounded-md">
                                    Add Collection
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};


const JobDetails = () => {
    const {id} = useParams<{id: string}>();
    const {JobPost, isLoading, isError, mutate} = fetchJobPost(Number(id));
    const {userType, isLoading:userLoading, isError:userError} = useUserType();
    const [open, setOpen] = useState(false);
    const {toast} = useToast();

    if (userLoading) return <div>Loading...</div>;
    if (userError) return <div>Error loading user data.</div>;

    // Handle job form submission
    const handleJobFormSubmit = async (data: any) => {
        const result = await updateJobPost(Number(id), data, mutate, data);
        if (result.success) {
            setOpen(false); // Close the dialog
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
    };

    if (isLoading) return <SkeletonJobDetails />;
    if (isError) return <div>Error loading job details.</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{JobPost.title} </h1>
                        <p className="text-gray-600">at {JobPost.companyName}</p>
                        <div className="flex space-x-2 mt-2">
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{JobPost.workTiming}</span>
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Featured</span>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-bold">Job Description</h2>
                            <p className="mt-2">
                                {JobPost.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        {userType.userType === "applicant" ? (
                            <ApplicantView jobId={Number(id)}/>
                        ) : userType.userType === "employer" ? (
                            <div className="flex flex-col space-y-2">
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-400 text-white rounded-md">
                                            Edit Job Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="overflow-y-auto max-h-[500px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit Job Details</DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription>
                                            Enter details below
                                        </DialogDescription>
                                        <JobForm onSubmit={handleJobFormSubmit} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ) : null}
                    </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                        {/*<li>Experience: $50k-$60k/month</li>*/}
                        {/*<li>Job level: Entry Level</li>*/}
                        <li>Location: {JobPost.location.city},{JobPost.location.state},{JobPost.location.country} </li>
                    </ul>
                </div>

                {/*<div className="bg-white shadow-lg rounded-lg p-6">*/}
                {/*    <h3 className="text-lg font-semibold">Share this job:</h3>*/}
                {/*    <div className="flex space-x-4 mt-2">*/}
                {/*        <button className="text-blue-600">Share on Facebook</button>*/}
                {/*        <button className="text-blue-500">Share on Twitter</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>

        </div>
    );
};

export default JobDetails;
