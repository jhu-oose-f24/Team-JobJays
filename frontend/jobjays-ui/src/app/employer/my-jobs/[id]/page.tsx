"use client";  // Add this directive at the top

import React from "react";
import MyJobs from "@/components/employer/MyJobs";
import {useParams} from "next/navigation";


const MyJobsPage: React.FC = () => {
    const {id} = useParams<{id: string}>();
    return <MyJobs id={id}/>;
};

export default MyJobsPage;
