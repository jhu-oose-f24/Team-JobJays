"use client";
import {useSearchParams} from "next/navigation";
import ListCompany from "@/components/employer/ListCompany";
import ListJob from "@/components/jobPost/ListJob";
import RelatedJobs from "@/components/jobPost/RelatedJobs";
import SearchBar from "@/components/SearchBar";
import React from "react";

export default function Search() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "" || "JOBS" || "EMPLOYERS" || "CANDIDATES";
    return (
        <>
            <header className="flex justify-center items-center p-6 bg-white shadow-md">
                <SearchBar/>

            </header>


            <div className={"py-4"}>
                <ListCompany query={query}/>
                <ListJob query={query}/>
                <RelatedJobs/>
            </div>
        </>
    );
}