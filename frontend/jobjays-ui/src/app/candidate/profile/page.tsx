// app/candidate/profile/page.tsx

"use client";

import React from 'react';
import { useApplicant, useApplicantSkills } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Edit3 } from 'lucide-react';

const CandidateProfile: React.FC = () => {
    // Fetch applicant data
    const { applicantProfile, isLoading: isProfileLoading, isError: isProfileError } = useApplicant();
    const { skills, isLoading: isSkillsLoading, isError: isSkillsError } = useApplicantSkills();
    const router = useRouter();

    console.log("Applicant Profile", applicantProfile);

    if (isProfileLoading || isSkillsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold">Loading profile...</div>
            </div>
        );
    }

    if (isProfileError || isSkillsError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold text-red-500">Error loading profile.</div>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold mb-2">{name}</h1>
                    <p className="text-gray-600 text-center mb-4">{bio}</p>
                    <div className="mt-4">
                        <button
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => router.push('/candidate/settings')}
                        >
                            <Edit3 className="w-5 h-5 mr-2" />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                            >
                                {/* Optional: Add an icon for each skill */}
                                {/* <SkillIcon skill={skill} className="w-4 h-4 mr-1" /> */}
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No skills added yet.</p>
                )}
            </div>
        </div>
    );
};

export default CandidateProfile;
