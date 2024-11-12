"use client";

import React from 'react';
import { useApplicant } from "@/lib/api";
import { useRouter } from "next/navigation";

const CandidateProfile: React.FC = () => {

    // Retrieve applicantId from localStorage
    const applicantId = typeof window !== 'undefined' && localStorage.getItem('applicantId')
        ? parseInt(localStorage.getItem('applicantId') as string)
        : null;

    // If no applicantId, redirect to login or show a message
    if (!applicantId) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-center text-gray-600">
                        Please <a href="/login" className="text-blue-600">log in</a> to view your profile.
                    </p>
                </div>
            </div>
        );
    }

    // Fetch applicant data
    const { applicantProfile, isLoading, isError } = useApplicant(applicantId);

    if (isLoading) return <div>Loading profile...</div>;
    if (isError) return <div>Error loading profile.</div>;
    if (!applicantProfile) return <div>No profile data found.</div>;

    const { name, bio } = applicantProfile;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 mb-4">
                        <img
                            src="/user.jpg" // Replace with actual profile picture URL if available
                            alt="Profile Picture"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{name}</h1>
                    <p className="text-gray-600 text-center">Bio: {bio}</p>
                    {/* Add Edit Profile Button */}
                    {/*<div className="mt-4">*/}
                    {/*    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">*/}
                    {/*        Edit Profile*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default CandidateProfile;
