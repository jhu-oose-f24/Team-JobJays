"use client";
import { useState } from "react";
import { HomeIcon, GearIcon, ExitIcon, BookmarkIcon } from "@radix-ui/react-icons";

export default function Sidebar({isApplicant}: {isApplicant: boolean}) {
    const [isOpen] = useState(false);

    return (
        <div className="flex">

            {/* Sidebar */}
            <div
                className={`fixed z-10 md:static md:w-64 bg-white shadow-lg h-screen transition-transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >
                <div className="flex flex-col h-full p-4 space-y-4">
                    {/* Sidebar links */}
                    <a
                        href="/home"
                        className="flex items-center space-x-2 hover:text-blue-600"
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span>Home</span>
                    </a>
                    <a
                        href="/settings"
                        className="flex items-center space-x-2 hover:text-blue-600"
                    >
                        <GearIcon className="w-5 h-5" />
                        <span>Settings</span>
                    </a>
                    <a
                        href="/login"
                        className="flex items-center space-x-2 hover:text-red-600"
                    >
                        <ExitIcon className="w-5 h-5" />
                        <span>Login</span>
                    </a>
                    { isApplicant && <a
                        href="/saved"
                        className="flex items-center space-x-2 hover:text-blue-600"
                    >
                        <BookmarkIcon className="w-5 h-5" />
                        <span>Saved</span>
                    </a>}
                </div>
            </div>
        </div>
    );
}