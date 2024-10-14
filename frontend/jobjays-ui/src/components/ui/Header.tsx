"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import {Employer, EmployerProfile, JobPost} from "@/lib/types";

export default function Header() {
    const router = useRouter()
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<(JobPost | Employer)[]> ([]);
    const [showDropdown, setShowDropdown] = useState(false);


    // Function to fetch search results (jobPost titles and employer names)
    const fetchSearchResults = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const response = await fetch(`http://localhost:8080/api/companies/profile/search/name?name=${query}`);
        if (!response.ok) {
            console.error("Failed to fetch Employer search results");
            return;
        }

        const jobPostResponse = await fetch(`http://localhost:8080/api/search/posts/jobs/title?title=${query}`);
        if (!jobPostResponse.ok) {
            console.error("Failed to fetch Job Post search results");
            return;
        }
        const jobPosts = await jobPostResponse.json();
        const Employers = await response.json();
        const combinedResults = [...jobPosts, ...Employers];
        setResults(combinedResults);


    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults(query);
            setShowDropdown(true);
        }, 300); // Adjust debounce delay as needed

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };


    // Handle selection of a search result
    const handleSelect = (result: any) => {
        setShowDropdown(false);
        if ('title' in result) {
            router.push(`post/jobs/${result.id}`); // Redirect to job detail page
        } else if ('employer_id' in result) {
            console.log((result as Employer).employer_id);
            router.push(`/employer/${(result as Employer).employer_id}/my-jobs`); // Redirect to employer detail page
        }
    };


    // Handle form submission (redirect to search results page)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //setShowDropdown(false);
        // fetchSearchResults(query);
        setShowDropdown(true);
        // fetchSearchResults(query);
        // router.push(`/search?query=${query}`);
        // router.push({
        //         pathname: '/search',
        //         query: { query: query }, // You can still pass the query in the URL
        //      },
        //    undefined,
        //     { shallow: true, state: { results }
        //     });

    };


    return (
      <header
          className="flex justify-between items-center p-6 bg-white shadow-md font-[family-name:var(--font-geist-sans)]">
          <div className="flex items-center gap-8">
              <Link href="/">
                  <img src="/JobJays_logo.png" alt="JobJays Logo" width={80}/>
              </Link>
              <nav className="flex gap-9">
                  <Link href="/">Home</Link>
                  <Link href="/find-job">Find Job</Link>
                  <Link href="/employer/dashboard">Employers</Link>
                  <Link href="/candidate/dashboard">Candidates</Link>
              </nav>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md mx-8">
              <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder="Search jobs, companies, etc."
                    value={query}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </form>
              {/* Dropdown for search results */}
              {showDropdown && results.length > 0 && (
                  <div className="absolute left-0 right-0 bg-white border mt-1 rounded-md shadow-lg z-10">
                      {results.map((result, index) => (
                          <div
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelect(result)}
                          >
                              {"title" in result ? (
                                  // It's a JobPost
                                  <div>
                                      <p className="font-bold">{(result as JobPost).title}</p>
                                      <p className="text-sm text-gray-500">Job</p>
                                  </div>
                              ) : (
                                  // It's an EmployerProfile
                                  <div>
                                      <p className="font-bold">{(result as Employer).employerProfile.name}</p>
                                      <p className="text-sm text-gray-500">Employer</p>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              )}
          </div>

          <div className="flex gap-4 font-[family-name:var(--font-geist-sans)]">
              <button className="px-4 py-2 border rounded-md" onClick={() => router.push('/signup')}>Sign Up</button>
              <button className="px-4 py-2 bg-blue-400 text-white rounded-md"
                      onClick={() => router.push('/employer/post-job')}>Post A Job
              </button>
          </div>
      </header>
  );
}
