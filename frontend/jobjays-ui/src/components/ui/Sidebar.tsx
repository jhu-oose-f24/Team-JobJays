"use client";
import {useState} from "react";
import { HomeIcon, GearIcon, ExitIcon  } from '@radix-ui/react-icons';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Mobile sidebar toggle button */}
            <button
                className="md:hidden p-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Sidebar */}
            <div className={`fixed z-10 md:static md:w-64 bg-white shadow-lg h-full transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex flex-col h-full p-4 space-y-4">
                    {/* Sidebar links */}
                    <a href="/dashboard" className="flex items-center space-x-2 hover:text-blue-600">
                        <HomeIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                    </a>
                    <a href="/settings" className="flex items-center space-x-2 hover:text-blue-600">
                        <GearIcon className="w-5 h-5" />
                        <span>Settings</span>
                    </a>
                    <a href="/logout" className="flex items-center space-x-2 hover:text-red-600">
                        <ExitIcon className="w-5 h-5" />
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </div>
    );
}