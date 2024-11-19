"use client";
import React, {useEffect} from 'react';
// import { useParams } from "next/navigation";
// import { fetchJobPost } from '@/lib/api'; // Use your custom hook or fetch logic
// import styles from '@/styles/postJob.module.css';
import JobDetails from "@/components/jobPost/JobDetails";
import RelatedJobs from "@/components/jobPost/RelatedJobs";
// import ContactUs from "@/components/ContactUs";
import Link from "next/link";
import {useParams} from "next/navigation";
import {addImpressionEvent} from "@/lib/api";
import {useRouter} from "next/navigation";

const JobDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        // Call the API to increment the view count whenever this page loads
        addImpressionEvent(Number(id));
    }, [id]);

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
            <RelatedJobs />
        </div>
    );
};

export default JobDetailPage;