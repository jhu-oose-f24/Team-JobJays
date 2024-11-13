"use client";
import ListJob from "@/components/jobPost/ListJob";
import Header from "@/components/ui/Header";
import RelatedJobs from "@/components/jobPost/RelatedJobs";
import {useSearchParams} from "next/navigation";
import ListCompany from "@/components/employer/ListCompany";
import {Suspense} from "react";

function FallBack() {
    return <>placeHolder</>
}

const ListJobPage = () => {
        const searchParams = useSearchParams();
        const query = searchParams.get("query") || "" || "JOBS" || "EMPLOYERS" || "CANDIDATES";
        return (
        <>
            <Suspense fallback={<FallBack/>}>

            <Header />
            <div className={"py-4"}>
                <ListCompany query={query} />
                <ListJob query={query} />
                <RelatedJobs/>
            </div>
            </Suspense>
        </>
        );
    };
    
    export default ListJobPage;

