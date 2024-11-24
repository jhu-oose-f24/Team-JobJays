"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { logout } from "@/lib/api";
import SearchBar from "@/components/SearchBar";

const CLIENT_URL = `http://localhost:3000`;

export default function Header() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setRole(localStorage.getItem("role"));
        } else {
            setToken(null);
            setRole(null);
        }
    }, []);

    const handleProfilePush = () => {
        if (role === "employer") {
            router.push(`/${role}/dashboard`);
        } else if (role === "candidate") {
            router.push(`/${role}/profile`);
        }
    };



    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <img src="/JobJays_logo.png" alt="JobJays Logo" width={80} />
                </Link>
                <nav className="flex gap-9">
                    <Link href="/">Home</Link>
                    <Link href={`/post/jobs/all?query=JOBS`}>Jobs</Link>
                    <Link href={`/post/jobs/all?query=EMPLOYERS`}>Employers</Link>
                    <Link href={`/post/jobs/all?query=CANDIDATES`}>Candidates</Link>
                </nav>
            </div>

            <SearchBar />

            <div className="flex gap-4">
                {token ? (
                    <>
                        <button className="px-4 py-2 bg-blue-400 text-white rounded-md" onClick={handleProfilePush}>
                            My Profile
                        </button>
                        <button
                            className="px-4 py-2 bg-red-400 text-white rounded-md"
                            onClick={() => {
                                logout();
                                router.push("/signin");
                            }}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <button className="px-4 py-2 border rounded-md" onClick={() => router.push("/signup")}>
                            Sign Up
                        </button>
                        <button className="px-4 py-2 bg-blue-400 text-white rounded-md" onClick={() => router.push("/signin")}>
                            Log In
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
