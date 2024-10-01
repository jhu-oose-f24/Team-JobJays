"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CreateAccount() {
  const [selectedTab, setSelectedTab] = useState<"Candidate" | "Employer">(
    "Employer"
  );

  return (
    <section className="flex flex-row h-screen">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-2 left-2 px-4 py-1 bg-blue-400 text-white rounded-lg shadow-md"
      >
        <h2 className="text-black">←</h2>
      </Link>

      {/* Left side form*/}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center">
        {/* Logo */}
        <div className="mb-1">
          <Image src="/JobJays_logo.png" alt="JobJays Logo" width={73} height={60} />
        </div>

        {/* Create account header */}
        <h2 className="text-3xl font-bold mb-4">Create account</h2>
        <p className="text-gray-500 mb-8">
          Already have an account? <a href="/signin" className="text-blue-600">Log In</a>
        </p>

        {/* Tabs for candidate and employer */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTab === "Candidate" ? "bg-blue-400" : "bg-gray-100"
            }`}
            onClick={() => setSelectedTab("Candidate")}
          >
            <h2 className="font-bold ">Candidate</h2>
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTab === "Employer" ? "bg-blue-400" : "bg-gray-100"
            }`}
            onClick={() => setSelectedTab("Employer")}
          >
            <h2 className="font-bold">Employer</h2>
          </button>
        </div>

        {/* Content based on selected tab */}
        {selectedTab === "Employer" ? (
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Employer Name"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Employer Info"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-2 border rounded-md"
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="h-4 w-4" />
              <label htmlFor="terms" className="text-gray-500">
                I&apos;ve read and agree with your <a href="#" className="text-blue-600">Terms of Services</a>
              </label>
            </div>
            <button className="px-6 py-3 bg-blue-400 text-white rounded-md mt-4">
              <h2 className="font-bold">Create Account</h2>
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <p>Sign up using one of the following options:</p>
            <button className="px-6 py-3 flex items-center gap-2 border rounded-md">
              <Image
                src="/jhucrest.png"
                alt="Facebook"
                width={65}
                height={20}
              />
              JHU SSO
            </button>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="hidden md:flex md:w-1/2 bg-blue-400 items-center justify-center relative">
        <Image
          src="/create-account-banner.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="absolute text-white text-center px-8">
          <h3 className="text-3xl font-bold mb-4">
            Over 1,075,324 candidates searching for their perfect opportunity.
          </h3>
          <div className="flex gap-8 justify-center">
          </div>
        </div>
      </div>
    </section>
  );
}
