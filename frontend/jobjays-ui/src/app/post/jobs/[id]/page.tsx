"use client";
import React from 'react';
import JobDetails from "@/components/jobPost/JobDetails";
import Link from "next/link";
import {useRouter} from "next/navigation";

const JobDetailPage: React.FC = () => {
    const router = useRouter();
    return (
        <div className="bg-gray-100">
            {/* <Navbar />
            <HeaderActions /> */}
            <header className="bg-white py-4 shadow">
                <div className="container mx-auto flex items-center">
                    {/* Back Button */}
                    <button onClick={() => router.back()} className="mr-4 text-gray-600 hover:text-gray-800">
                        ←
                    </button>
                    {/* Logo and Title */}
                    <Link href="/" className="flex items-center space-x-3">
                        <img src="/JobJays_logo.png" alt="JobJays Logo" width={80} />
                        <h1 className="text-3xl font-bold">JobJays</h1>
                    </Link>
                </div>
            </header>
            <JobDetails />
        </div>
    );
};

export default JobDetailPage;