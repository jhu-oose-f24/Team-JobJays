"use client";
import ListJob from "@/components/jobPost/ListJob";
import Header from "@/components/ui/Header";
import RelatedJobs from "@/components/jobPost/RelatedJobs";
import {useSearchParams} from "next/navigation";
import ListCompany from "@/components/employer/ListCompany";

    const ListJobPage = () => {
        const searchParams = useSearchParams();
        const query = searchParams.get("query") || "";
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
    };
    
    export default ListJobPage;

