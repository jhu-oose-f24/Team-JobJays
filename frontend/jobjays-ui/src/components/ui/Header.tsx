"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-8">
        <Link href="/">
          <img src="/JobJays_logo.png" alt="JobJays Logo" width={80} />
        </Link>
        <nav className="flex gap-9">
          <Link href="/">Home</Link>
          <Link href="/find-job">Find Job</Link>
          <Link href="/employer/dashboard">Employers</Link>
          <Link href="/candidate/dashboard">Candidates</Link>
        </nav>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-md mx-8">
        <input
          type="text"
          placeholder="Search jobs, companies, etc."
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="flex gap-4 font-[family-name:var(--font-geist-sans)]">
        <button className="px-4 py-2 border rounded-md" onClick={() => router.push('/signup')}>Sign Up</button>
        <button className="px-4 py-2 bg-blue-400 text-white rounded-md" onClick={() => router.push('/employer/post-job')} >Post A Job</button>
      </div>
    </header>
  );
}
