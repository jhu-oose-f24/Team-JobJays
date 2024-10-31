// import React from 'react';
// import styles from '@/styles/dashboard.module.css';
// import Link from "next/link";
//
// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div className={styles.dashboardContainer}>
//             {/* Sidebar */}
//             <aside className={styles.sidebar}>
//                 <h2>JobJays</h2>
//                 <nav className={styles.navMenu}>
//                     <Link href={"/dashboard"} className={styles.navItem}>
//                         </Link>
//                     <Link href={"/employer/profile"} className={styles.navItem}> My Profile</Link>
//                     <a href="#jobs" className={styles.navItem}>My Jobs</a>
//                     <a href="#post" className={styles.navItem}>Post a Job</a>
//                     <a href="#candidates" className={styles.navItem}>Saved Candidates</a>
//                     <a href="#questions" className={styles.navItem}>Custom Questions</a>
//                     {/*<a href="#plans" className={styles.navItem}>Plans & Billing</a>*/}
//                     {/*<a href="#message" className={styles.navItem}>Message</a>*/}
//                     <a href="#verify" className={styles.navItem}>Verify Account</a>
//                     <a href="#logout" className={styles.navItem}>Log Out</a>
//                 </nav>
//             </aside>
//
//             {/* Main Content */}
//             <main className={styles.mainContent}>
//                 {children} {/* Page-specific content will be rendered here */}
//             </main>
//         </div>
//     );
// };
//
// export default DashboardLayout;
// app/employer/layout.tsx
// 'use client';
// import React from 'react';
// import styles from '@/styles/dashboard.module.css';
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
//     const { employerId } = useParams();
//     return (
//         <div className={styles.dashboardContainer}>
//             {/* Sidebar */}
//             <aside className={styles.sidebar}>
//                 <Link href="/">
//                     <img src="/JobJays_logo.png" alt="JobJays Logo" width={80}/>
//                 </Link>
//                 <Link href={`/`}><h2>Job Jays</h2></Link>
//                 <nav className={styles.navMenu}>
//                     <Link href={`/employer/${employerId}/dashboard`} className={styles.navItem}> Overview
//                     </Link>
//                     <Link href={`/employer/${employerId}/profile`} className={styles.navItem}> My Profile</Link>

//                     <Link href={`/employer/${employerId}/post-job`} className={styles.navItem}> Post a Job</Link>
//                     <Link href={`/employer/${employerId}/my-jobs`} className={styles.navItem}>My Jobs</Link>
//                     <Link href={`/employer/${employerId}/saved-candidates`} className={styles.navItem}> Saved Candidates</Link>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <main className={styles.mainContent}>
//                 {children} {/* All child pages (dashboard, profile, etc.) will render here */}
//             </main>
//         </div>
//     );
// };

// export default EmployerLayout;

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

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
    const { employerId } = useParams();
    const [collapsed, setCollapsed] = React.useState(false);

    const navItems = [
        {
            href: `/employer/${employerId}/dashboard`,
            label: 'Overview',
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            href: `/employer/${employerId}/profile`,
            label: 'My Profile',
            icon: <UserCircle className="w-5 h-5" />
        },
        {
            href: `/employer/${employerId}/post-job`,
            label: 'Post a Job',
            icon: <Briefcase className="w-5 h-5" />
        },
        {
            href: `/employer/${employerId}/my-jobs`,
            label: 'My Jobs',
            icon: <BookmarkPlus className="w-5 h-5" />
        },
        {
            href: `/employer/${employerId}/saved-candidates`,
            label: 'Saved Candidates',
            icon: <Users className="w-5 h-5" />
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside 
                className={`${
                    collapsed ? 'w-20' : 'w-64'
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
                            className={`w-5 h-5 transition-transform duration-300 ${
                                collapsed ? 'rotate-180' : ''
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
                    <button className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full">
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