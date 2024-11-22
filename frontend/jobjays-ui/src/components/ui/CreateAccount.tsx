"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {registerApplicant, registerEmployer} from "@/lib/api";

export default function CreateAccount() {
  const [selectedTab, setSelectedTab] = useState<"Candidate" | "Employer">(
    "Employer"
  );
  const { toast } = useToast();


  const router = useRouter()

  const [formData, setFormData] = useState({
    employerName: "",
    employerInfo: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [candForm, setCandForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    // resume: "",
    applicantName: "",
    applicantInfo: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error! Try Again",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return;
    }

    const employerData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        employerName: formData.employerName,
        employerInfo: formData.employerInfo,
    }


    const response = await registerEmployer(employerData);
    if (response.success) {
      toast({
        title: "Success",
        description: "Registration successful! Check your email for verification",
        variant: "default",
      });
      router.push(`/signin`);
    } else {
      toast({
        title: "Error! Try Again",
        description: `${response.error}`,
        variant: "destructive",
      });
    }
  };

    // Handle input changes
    const handleCandInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCandForm((prev) => ({ ...prev, [name]: value }));
    };
  
    // Handle form submission
    const handleCandSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error! Try Again",
          description: "Passwords do not match",
          variant: "destructive",
        })
        return;
      }

      const candidateData = {
            username: candForm.username,
            password: candForm.password,
            email: candForm.email,
            applicantName: candForm.applicantName,
            applicantInfo: candForm.applicantInfo,
      }

      const response = await registerApplicant(candidateData);
      if (response.success) {
        toast({
          title: "Success",
          description: "Registration successful! Check your email for verification",
          variant: "default",
        });
        router.push(`/signin`);
      } else {
        toast({
          title: "Error! Try Again",
          description: `${response.error}`,
          variant: "destructive",
        });
      }
    };

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="employerName"
              value={formData.employerName}
              onChange={handleInputChange}
              placeholder="Name"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="employerInfo"
              value={formData.employerInfo}
              onChange={handleInputChange}
              placeholder="Bio"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="px-4 py-2 border rounded-md"
            />
            {/*<div className="flex items-center gap-2">*/}
            {/*  <input type="checkbox" id="terms" className="h-4 w-4" />*/}
            {/*  <label htmlFor="terms" className="text-gray-500">*/}
            {/*    I&apos;ve read and agree with your <a href="#" className="text-blue-600">Terms of Services</a>*/}
            {/*  </label>*/}
            {/*</div>*/}
            <button className="px-6 py-3 bg-blue-400 text-white rounded-md mt-4">
              <h2 className="font-bold">Create Account</h2>
            </button>
          </form>
        ) : (
            <form className="flex flex-col gap-4" onSubmit={handleCandSubmit}>
              <input
                  type="text"
                  name="applicantName"
                  value={candForm.applicantName}
                  onChange={handleCandInputChange}
                  placeholder="Name"
                  className="px-4 py-2 border rounded-md"
              />
              <input
                  type="text"
                  name="applicantInfo"
                  value={candForm.applicantInfo}
                  onChange={handleCandInputChange}
                  placeholder="Bio"
                  className="px-4 py-2 border rounded-md"
              />
              <input
                  type="text"
                  name="username"
                  value={candForm.username}
                  onChange={handleCandInputChange}
                  placeholder="Username"
                  className="px-4 py-2 border rounded-md"
              />
              <input
                  type="email"
                  name="email"
                  value={candForm.email}
                  onChange={handleCandInputChange}
                  placeholder="Email address"
                  className="px-4 py-2 border rounded-md"
              />
              <input
                  type="password"
                  name="password"
                  value={candForm.password}
                  onChange={handleCandInputChange}
                  placeholder="Password"
                  className="px-4 py-2 border rounded-md"
              />
              <input
                  type="password"
                  name="confirmPassword"
                  value={candForm.confirmPassword}
                  onChange={handleCandInputChange}
                  placeholder="Password"
                  className="px-4 py-2 border rounded-md"
              />

              {/*<input*/}
              {/*    type="text"*/}
              {/*    name="resume"*/}
              {/*    value={candForm.resume}*/}
              {/*    onChange={handleCandInputChange}*/}
              {/*    placeholder="Resume (will be fleshed out)"*/}
              {/*    className="px-4 py-2 border rounded-md"*/}
              {/*/>*/}

              {/*<div className="flex items-center gap-2">*/}
              {/*  <input type="checkbox" id="terms" className="h-4 w-4"/>*/}
              {/*  <label htmlFor="terms" className="text-gray-500">*/}
              {/*    I&apos;ve read and agree with your <a href="#" className="text-blue-600">Terms of Services</a>*/}
              {/*  </label>*/}
              {/*</div>*/}
              <button className="px-6 py-3 bg-blue-400 text-white rounded-md mt-4">
                <h2 className="font-bold">Create Account</h2>
              </button>
            </form>
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
