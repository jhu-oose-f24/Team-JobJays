import { fetchAllJobPosts } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";

interface ListJobProps {
    query: string;
}

const ListJob = ({ query }: ListJobProps) => {
    const { JobPosts, isLoading, isError } = fetchAllJobPosts();

    if (query === "EMPLOYERS" || query === "CANDIDATES") {
        return <div></div>;
    }
    if (query === "JOBS") { query = ""; }
    if (isLoading) return <div className="text-center py-6">Loading...</div>;
    if (isError) return <div className="text-center py-6">Error loading all job details.</div>;
    if (!JobPosts) return <div className="text-center py-6">Jobs not found.</div>;

    const activeJobListings = JobPosts.filter(job => job.status === 'Active');

    const filteredJobListings = query
        ? activeJobListings.filter(job =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.description.toLowerCase().includes(query.toLowerCase()) ||
            job.location.city.toLowerCase().includes(query.toLowerCase()) ||
            job.location.state.toLowerCase().includes(query.toLowerCase()) ||
            job.location.country.toLowerCase().includes(query.toLowerCase()) ||
            job.companyName.toLowerCase().includes(query.toLowerCase())
        )
        : activeJobListings;

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 mt-8">
            {filteredJobListings.map((jobListing) => (
                <Link
                    key={jobListing.id}
                    href={`/post/jobs/${jobListing.id}`}
                    className="group block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                    {/* Header with title */}
                    <div className="flex items-start justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800">
                            {jobListing.title}
                        </h2>
                    </div>

                    {/* Employer Name */}
                    <div className="mb-2">
                        <p className="text-sm font-medium text-gray-500">
                            {jobListing.companyName}
                        </p>
                    </div>

                    {/* Job type*/}
                    <div className="mb-3">
                        <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-2 py-1 rounded">
                            {jobListing.workTiming}
                        </span>
                    </div>

                    {/* Location & Salary */}
                    <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                            {jobListing.location.city}, {jobListing.location.state}, {jobListing.location.country}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                            ${jobListing.minSalary.toLocaleString()} - ${jobListing.maxSalary.toLocaleString()}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

const SuspenseListJob = ({ query }: ListJobProps) => {
    return (
        <Suspense fallback={<div className="text-center py-6">Loading job posts...</div>}>
            <ListJob query={query} />
        </Suspense>
    );
};

export default SuspenseListJob;
