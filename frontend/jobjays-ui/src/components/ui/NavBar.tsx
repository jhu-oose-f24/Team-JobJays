"use client";
import Link from 'next/link';
import {usePathname} from "next/navigation"; // if router is not working, use this or update next version



export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center space-x-8 py-4 bg-gray-100 shadow-md">
            <Link
                href={"/feed"}
                className={`text-lg ${pathname === '/feed' ? 'underline' : ''}`}>
                
                Feed
                
            </Link>
            <Link
                href={"/search"}
                className={`text-lg ${pathname === '/search' ? 'underline' : ''}`}>
                
                Search
                
            </Link>
            <Link
                href={"/profile"}
                className={`text-lg ${pathname === '/profile' ? 'underline' : ''}`}>
                
                Profile
                
            </Link>
        </nav>
    );
}