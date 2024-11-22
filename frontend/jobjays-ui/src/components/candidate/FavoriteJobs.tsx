"use client";


import React, {useEffect, useState} from 'react';
import {useSavedJobCollections} from "@/lib/api";

import SkeletonJobDetails from "@/components/jobPost/SkeletonJobDetails";
import Link from "next/link";
import {SavedJobCollection} from "@/lib/types";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import styles from "@/styles/favoriteJobs.module.css";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



// const FavoriteJobs: React.FC = () => {
//
//     const { Collections, isLoading, isError } = useSavedJobCollections();
//
//     if (isLoading) return <SkeletonJobDetails />;
//     if (isError) return <div>Error loading job details.</div>;
//     if (!Collections || Collections.length === 0) return <div>No saved jobs found.</div>;
//
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-semibold mb-6">My Saved Jobs</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Collections.map((collection: SavedJobCollection) => (
//                     <div key={collection.id} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
//                         <h2 className="text-xl font-bold text-blue-600 mb-2">{collection.name}</h2>
//                         <p className="text-gray-600 mb-4">Total Jobs: {collection.jobPosts.length}</p>
//                         </div>
//                         // <Link
//                     //     key={jobListing.id}
//                     //     href={`/post/jobs/${jobListing.id}`}
//                     //     className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
//                     // >
//                     //     <h2 className="text-xl font-bold text-blue-600 mb-2">{jobListing.title}</h2>
//                     //     <p className="text-gray-600 mb-4">{jobListing.description.slice(0, 100)}</p>
//                     //     <div className="flex items-center justify-between">
//                     //         <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     //             {jobListing.workTiming}
//                     //         </span>
//                     //         <div className="text-right">
//                     //             <p className="text-gray-700">
//                     //                 {jobListing.location.city}, {jobListing.location.state}, {jobListing.location.country}
//                     //             </p>
//                     //             <p className="text-gray-700">
//                     //                 Salary: ${jobListing.minSalary.toLocaleString()} - ${jobListing.maxSalary.toLocaleString()}
//                     //             </p>
//                     //         </div>
//                     //     </div>
//                     // </Link>
//
//                 ))}
//             </div>
//         </div>
//     );
// };
const FavoriteJobs: React.FC = () => {
    const { Collections, isLoading, isError } = useSavedJobCollections();
    const [expandedCollectionId, setExpandedCollectionId] = useState<number | null>(null);

    useEffect(() => {
        // Close the expanded collection if clicking outside of it
        const handleOutsideClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).closest('.expanded-card') === null) {
                setExpandedCollectionId(null);
            }
        };

        if (expandedCollectionId) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => document.removeEventListener('click', handleOutsideClick);
    }, [expandedCollectionId]);

    if (isLoading) return <SkeletonJobDetails />;
    if (isError) return <div>Error loading job details.</div>;
    if (!Collections || Collections.length === 0) return <div>No saved jobs found.</div>;

    const toggleCollectionExpansion = (id: number) => {
        setExpandedCollectionId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6">My Saved Jobs</h1>
            <PlusCircledIcon className="w-6 h-6 text-blue-600 cursor-pointer " />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Collections.map((collection: SavedJobCollection) => (
                    <Popover key={collection.id}>
                        <PopoverTrigger asChild>
                            <div
                                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                            >
                                <h2 className="text-xl font-bold text-blue-600 mb-2">{collection.name}</h2>
                                <p className="text-gray-600 mb-4">Total Jobs: {collection.jobPosts.length}</p>
                            </div>
                        </PopoverTrigger>

                        <PopoverContent className="p-4 bg-white rounded-lg shadow-lg">
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {collection.jobPosts.map((jobListing) => (
                                    <Link
                                        key={jobListing.id}
                                        href={`/post/jobs/${jobListing.id}`}
                                        className="block p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                                    >
                                        <h3 className="text-lg font-semibold text-blue-600 mb-1">{jobListing.title}</h3>
                                        <p className="text-gray-700 mb-1">{jobListing.companyName}</p>
                                        <p className="text-gray-700">Salary: ${jobListing.minSalary.toLocaleString()} - ${jobListing.maxSalary.toLocaleString()}</p>
                                    </Link>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                ))}
            </div>
        </div>
    );
};



export default FavoriteJobs;

