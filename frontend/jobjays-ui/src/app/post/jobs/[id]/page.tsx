"use client";
import React, {useState} from 'react';
import { useParams } from "next/navigation";
import { fetchJobPost } from '@/lib/api'; // Use your custom hook or fetch logic
import styles from '@/styles/postJob.module.css';
import JobDetails from "@/components/jobPost/JobDetails";
import RelatedJobs from "@/components/jobPost/RelatedJobs";
import ContactUs from "@/components/ContactUs";

const JobDetailPage: React.FC = () => {
    return (
        <div className="bg-gray-100">
            <header className="bg-white py-4 shadow">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">JobJays</h1>
                </div>
            </header>
            <JobDetails />
            <RelatedJobs/>
            <ContactUs/>
        </div>
    )
}

export default JobDetailPage;
