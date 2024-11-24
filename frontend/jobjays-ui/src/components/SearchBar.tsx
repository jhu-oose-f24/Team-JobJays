"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Applicant, Employer, JobPost } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

//const API_URL = process.env.API_IP_ADDRESS;
const API_URL = "http://localhost:8080";


export default function SearchBar() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<(JobPost | Employer | Applicant)[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { toast } = useToast();

    // Function to fetch search results
    const fetchSearchResults = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        try {
            const [employerResponse, jobPostResponse, candidateResponse] = await Promise.all([
                fetch(`${API_URL}/api/companies/profile/search/name?name=${query}`,{
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                    }),
                fetch(`${API_URL}/api/search/posts/jobs/title?title=${query}`,{
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }),
                fetch(`${API_URL}/api/applicants/profile/search/name?name=${query}`,{
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }),
            ]);

            if (!employerResponse.ok || !jobPostResponse.ok || !candidateResponse.ok) {
                throw new Error("Failed to fetch search results");
            }

            const employers = await employerResponse.json();
            const jobPosts = await jobPostResponse.json();
            const candidates = await candidateResponse.json();
            setResults([...jobPosts, ...employers, ...candidates]);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: `Failed to fetch search results: ${error}`,
                variant: "default",
            });
        }
    };

    const handleResultSelect = (result: any) => {
        if ("minSalary" in result) {
            router.push(`/post/jobs/${result.id}`);
        } else if ("employerProfile" in result) {
            router.push(`/profile/employers/${result.username}`);
        } else if ("applicantProfile" in result) {
            router.push(`/profile/applicants/${result.username}`);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults(query);
            setShowDropdown(true);
        }, 300); // Adjust debounce delay as needed

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSelect = (result: JobPost | Employer | Applicant) => {
        setShowDropdown(false);
        handleResultSelect(result);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDropdown(false);
        router.push(`/post/jobs/all?query=${query}`);
    };

    return (
        <div className="relative flex-1 max-w-md mx-8">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search jobs, companies, etc."
                    value={query}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </form>
            {showDropdown && results.length > 0 && (
                <div className="absolute left-0 right-0 bg-white border mt-1 rounded-md shadow-lg z-10">
                    {results.slice(0, 5).map((result, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(result)}
                        >
                            {"minSalary" in result ? (
                                <div>
                                    <p className="font-bold">{(result as JobPost).title}</p>
                                    <p className="text-sm text-gray-500">Job</p>
                                </div>
                            ) : "employerProfile" in result ? (
                                <div>
                                    <p className="font-bold">{(result as Employer).employerProfile.name}</p>
                                    <p className="text-sm text-gray-500">Employer</p>
                                </div>
                            ) : "applicantProfile" in result ? (
                                <div>
                                    <p className="font-bold">{(result as Applicant).applicantProfile.name}</p>
                                    <p className="text-sm text-gray-500">Candidate</p>
                                </div>
                            ) : null}
                        </div>
                    ))}
                    {results.length > 5 && (
                        <div
                            className="px-4 py-2 text-center text-blue-500 hover:bg-gray-100 cursor-pointer"
                            onClick={() => router.push(`/post/jobs/all?query=${query}`)}
                        >
                            View all results
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
