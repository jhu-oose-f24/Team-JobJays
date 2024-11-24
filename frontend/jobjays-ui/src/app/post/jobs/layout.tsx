'use client';
import CandidateSidebar from "@/components/candidate/CandidateSidebar";
import React, {useEffect, useState} from "react";
import EmployerSidebar from "@/components/employer/EmployerSidebar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<string | null>(null);


    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('role')) {
            setRole(localStorage.getItem('role'));
        } else {
            setRole(null);
        }
    },[])

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            {role === "candidate" && <CandidateSidebar/>}
            {role === 'employer' && <EmployerSidebar/>}
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-6 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default PageLayout;