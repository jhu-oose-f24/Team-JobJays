"use client"

import { useEffect, useState } from "react";
import { JobPost } from "@/lib/types";
import JobDetails from "@/components/jobPost/JobDetails";
import Link from "next/link";
import SavedJobs from "@/components/candidate/SavedJobs";


const ApplicantProfilePage: React.FC = () => {

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
            <SavedJobs/>

    </div>
    )
};

export default ApplicantProfilePage;