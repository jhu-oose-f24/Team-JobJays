'use client';
import React from 'react';
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    LayoutDashboard,
    UserCircle,
    Briefcase,
    BookmarkPlus,
    Users,
    ChevronLeft,
    LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";
import {logout} from "@/lib/api";


const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
    //const { employerId } = useParams();
    const router = useRouter();
    const [collapsed, setCollapsed] = React.useState(false);

    const navItems = [
        {
            href: `/employer/dashboard`,
            label: 'Overview',
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            href: `/employer/profile`,
            label: 'My Profile',
            icon: <UserCircle className="w-5 h-5" />
        },
        {
            href: `/employer/post-job`,
            label: 'Post a Job',
            icon: <Briefcase className="w-5 h-5" />
        },
        {
            href: `/employer/my-jobs`,
            label: 'My Jobs',
            icon: <BookmarkPlus className="w-5 h-5" />
        }
        //,
        // {
        //     href: `/employer/saved-candidates`,
        //     label: 'Saved Candidates',
        //     icon: <Users className="w-5 h-5" />
        // }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`${collapsed ? 'w-20' : 'w-64'
                    } bg-white transition-all duration-300 border-r border-gray-200 flex flex-col`}
            >
                {/* Logo section */}
                <div className="p-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/JobJays_logo.png"
                            alt="JobJays Logo"
                            className="w-10 h-10 object-contain"
                        />
                        {!collapsed && (
                            <span className="text-xl font-semibold text-blue-600">
                                Job Jays
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <ChevronLeft
                            className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''
                                }`}
                        />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    <div className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                            >
                                {item.icon}
                                {!collapsed && (
                                    <span className="text-sm font-medium">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={() => {
                            logout();
                            router.push("/signin"); // Use router.push for navigation
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full">
                        <LogOut className="w-5 h-5" />
                        {!collapsed && (
                            <span className="text-sm font-medium">
                                Sign Out
                            </span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-6 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default EmployerLayout;