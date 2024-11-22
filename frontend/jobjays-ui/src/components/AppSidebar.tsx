import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/Sidebar";
import {BookmarkPlus, Brain, Briefcase, Eye, LayoutDashboard, UserCircle} from "lucide-react";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useToken, useUserType} from "@/lib/api";
import {UserTypeDto} from "@/lib/types";

const employerNavItems = [
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

const applicantNavItems = [
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
        href: `/advice`,
        label: 'AI Advice',
        icon: <Brain className="w-5 h-5" />
    }
];

export function AppSidebar() {
    const navItems = employerNavItems;

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup />
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href}
                                          className={"flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
export default AppSidebar;