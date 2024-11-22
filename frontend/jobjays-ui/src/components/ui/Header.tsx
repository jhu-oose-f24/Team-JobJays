"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import {Employer, JobPost} from "@/lib/types";
import {logout, useToken} from "@/lib/api";
import {useToast} from "@/hooks/use-toast";


const CLIENT_URL = `http://localhost:3000`;
const API_URL = process.env.API_IP_ADDRESS;

export default function Header() {
    const router = useRouter()
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<(JobPost | Employer)[]> ([]);
    const [showDropdown, setShowDropdown] = useState(false);
    //const token = useToken();
    const [token, setToken] = useState<string | null>(null);
    const {toast} = useToast();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    },[])


    // Function to fetch search results (jobPost titles and employer names)
    const fetchSearchResults = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const response = await fetch(`${API_URL}/api/companies/profile/search/name?name=${query}`);
        if (!response.ok) {
            console.error("Failed to fetch Employer search results");
            toast({
                title: "Error",
                description: "Failed to fetch search results",
                variant: "default"
            })
            return;
        }

        const jobPostResponse = await fetch(`${API_URL}/api/search/posts/jobs/title?title=${query}`);
        if (!jobPostResponse.ok) {
            console.error("Failed to fetch Job Post search results");
            toast({
                title: "Error",
                description: "Failed to fetch Job Post search results",
                variant: "default"
            })
            return;
        }

        const candidateResponse = await fetch(`${API_URL}/api/candidates/profile/search/name?name=${query}`);
        if (!candidateResponse.ok) {
            console.error("Failed to fetch Candidate search results");
            toast({
                title: "Error",
                description: "Failed to fetch Candidate search results",
                variant: "default"
            })
            return;
        }

        const jobPosts = await jobPostResponse.json();
        const Employers = await response.json();
        const Candidates = await candidateResponse.json();
        const combinedResults = [...jobPosts, ...Employers, ...Candidates];
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
            router.push(`${CLIENT_URL}/post/jobs/${result.id}`); // Redirect to job detail page
        } else if ('employer_id' in result) {
            router.push(`/employer/${(result as Employer).employer_id}/my-jobs`); // Redirect to employer detail page
        }
    };


    // Handle form submission (redirect to search results page)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDropdown(false);
        router.push(`${CLIENT_URL}/post/jobs/all?query=${query}`);
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
                  <Link href={`${CLIENT_URL}/post/jobs/all?query=JOBS`}>Find Job</Link>
                  <Link href={`${CLIENT_URL}/post/jobs/all?query=EMPLOYERS`}>Employers</Link>
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
                      {results.slice(0, 5).map((result, index) => (
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
                      {results.length > 5 && (
                          <div
                              className="px-4 py-2 text-center text-blue-500 hover:bg-gray-100 cursor-pointer"
                              onClick={() => router.push('/post/jobs/all?query=' + query)}
                          >
                              View all results
                          </div>
                      )}
                  </div>
              )}
          </div>

          <div className="flex gap-4 font-[family-name:var(--font-geist-sans)]">
              {token ? (
                  <>
                      <button
                          className="px-4 py-2 bg-red-400 text-white rounded-md"
                          onClick={() => {
                              logout();
                              router.push('/signin');
                          }}
                      >
                          Log Out
                      </button>
                  </>
              ) : (
                  <>
                      <button
                          className="px-4 py-2 border rounded-md"
                          onClick={() => router.push('/signup')}
                      >
                          Sign Up
                      </button>
                      <button
                          className="px-4 py-2 bg-blue-400 text-white rounded-md"
                          onClick={() => router.push('/signin')}
                      >
                          Log In
                      </button>
                  </>
              )}
          </div>
      </header>
  );
}
