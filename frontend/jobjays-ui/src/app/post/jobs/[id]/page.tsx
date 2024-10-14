"use client";
import React, {useState} from 'react';
import { useParams } from "next/navigation";
import { fetchJobPost } from '@/lib/api'; // Use your custom hook or fetch logic
import styles from '@/styles/postJob.module.css';
import JobDetails from "@/components/jobPost/JobDetails";
import RelatedJobs from "@/components/jobPost/RelatedJobs";
import ContactUs from "@/components/ContactUs";
import Link from "next/link";

const JobDetailPage: React.FC = () => {
    return (
        <div className="bg-gray-100">
            <header className="bg-white py-4 shadow">
                <div className="container mx-auto flex items-center">

                    <Link href="/" className= "flex items-center space-x-3">
                        <img src="/JobJays_logo.png" alt="JobJays Logo" width={80}/>
                        <h1 className="text-3xl font-bold">JobJays</h1>
                    </Link>
                </div>
            </header>
            <JobDetails />
            <RelatedJobs/>
            <ContactUs/>
        </div>
    )
}

export default JobDetailPage;
