"use client"

import React, { useEffect, useState } from "react";
import { JobPost } from "@/lib/types";
import JobDetails from "@/components/jobPost/JobDetails";
import Link from "next/link";
import SavedJobs from "@/components/candidate/SavedJobs";
import FavoriteJobs from "@/components/candidate/FavoriteJobs";


const ApplicantProfilePage: React.FC = () => {
    return <FavoriteJobs />;
};

export default ApplicantProfilePage;