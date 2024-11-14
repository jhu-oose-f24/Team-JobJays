"use client";
import {useSearchParams} from "next/navigation";
import Header from "@/components/ui/Header";
import ListCompany from "@/components/employer/ListCompany";
import ListJob from "@/components/jobPost/ListJob";
import RelatedJobs from "@/components/jobPost/RelatedJobs";

export default function Search() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "" || "JOBS" || "EMPLOYERS" || "CANDIDATES";
    return (
        <>
            <Header />
            <div className={"py-4"}>
                <ListCompany query={query} />
                <ListJob query={query} />
                <RelatedJobs/>
            </div>
        </>
    );
}