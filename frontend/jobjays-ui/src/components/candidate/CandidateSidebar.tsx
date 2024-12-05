import Link from "next/link";
import {BookmarkPlus, Brain, Briefcase, ChevronLeft, Eye, LogOut, UserCircle, Gavel, PenTool} from "lucide-react";
import {logout} from "@/lib/api";
import React from "react";
import {useRouter} from "next/navigation";

const CandidateSidebar = () => {
    const router = useRouter();
    const [collapsed, setCollapsed] = React.useState(false);



    const navItems = [
        // {
        //     href: `/candidate/dashboard`,
        //     label: 'Overview',
        //     icon: <LayoutDashboard className="w-5 h-5" />
        // },
        {
            href: `/candidate/profile`,
            label: 'My Profile',
            icon: <UserCircle className="w-5 h-5" />
        },
        {
            href: `/candidate/appliedJobs`,
            label: 'Applied Jobs',
            icon: <Briefcase className="w-5 h-5" />
        },
        {
            href: `/candidate/favoriteJobs`,
            label: 'Saved Jobs',
            icon: <BookmarkPlus className="w-5 h-5" />
        },
        {
            href: `/post/jobs/all`,
            label: 'View All Jobs',
            icon: <Eye className="w-5 h-5" />
        },
        {
            href: `/candidate/skills`,
            label: 'Add Skills To Profile',
            icon: <PenTool className="w-5 h-5" />
        },
        {
            href: `/advice`,
            label: 'AI Advice',
            icon: <Brain className="w-5 h-5" />
        },
        {
            href: `/candidate/eval`,
            label: 'AI Resume Critic',
            icon: <Gavel className="w-5 h-5" />
        }
    ];


    return (
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
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full"
                    onClick={() => {
                        logout();
                        router.push("/signin");
                    }}>
                    <LogOut className="w-5 h-5"/>
                    {!collapsed && (
                        <span className="text-sm font-medium">
                                Sign Out
                            </span>
                    )}
                </button>
            </div>
        </aside>
    )
}

export default CandidateSidebar;