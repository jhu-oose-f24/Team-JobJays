"use client";
import Link from 'next/link';
import {usePathname} from "next/navigation"; // if router is not working, use this or update next version
//import {useRouter} from "next/navigation";


export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center space-x-8 py-4 bg-gray-100 shadow-md">
            <Link href={"/feed"}>
                <a className={`text-lg ${pathname === '/feed' ? 'underline' : ''}`}>
                Feed
                </a>
            </Link>
            <Link href={"/search"}>
                <a className={`text-lg ${pathname === '/search' ? 'underline' : ''}`}>
                Search
                </a>
            </Link>
            <Link href={"/profile"}>
                <a className={`text-lg ${pathname === '/profile' ? 'underline' : ''}`}>
                Profile
                </a>
            </Link>
        </nav>
    )
}