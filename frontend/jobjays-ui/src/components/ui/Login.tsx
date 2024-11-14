"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

export default function Login() {
  const [selectedTab, setSelectedTab] = useState<"Candidate" | "Employer">(
    "Candidate"
  );
  const {toast} = useToast();

  const router = useRouter()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const [candForm, setCandForm] = useState({
  //   username: "",
  //   password: ""
  // });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // save the form data to the database
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8080/api/auth/employer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      if (response.status == 404) {
        alert("Invalid username or password");
        return;
      }

      if (response.ok) {
        console.log(response);
        const contentType = response.headers.get("content-type");
        let employerData;
        if (contentType && contentType.includes("application/json")) {
          employerData = await response.json();
        } else {
          employerData = { token: await response.text() }; // wrap the token in an object
        }

        //alert("Sign in successful!");
        toast({
          title: "Success",
          description: "Sign in successful!",
          variant: "default",
        });
        localStorage.setItem("token", employerData.token);
        console.log(employerData.token);
        router.push(`employer/dashboard`); // redirect to new user's dashboard
      } else {
        const errorData = await response.json();
        console.log(`Error: ${errorData.failReason}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };


  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("http://localhost:8080/api/auth/applicant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });


      if (response.ok) {
        console.log(response);
        const applicantData = await response.json();
        console.log(applicantData);
        const applicantId = applicantData.applicantId;
        // alert("Sign in successful!");
        toast({
          title: "Success",
          description: "Sign in successful!",
          variant: "default",
        });
        // so we can retrieve it for other pages - but not good approach
        localStorage.setItem("applicantId", applicantId);
        router.push(`candidate/dashboard`); // redirect to new user's dashboard
      } else {
        const errorData = await response.json();

        if (response.status == 404) {
          alert("Invalid username or password");
        }
        console.log(`Error: ${errorData.failReason}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error}`);
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

      {/* Left side form */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center">
        {/* Logo */}
        <div className="mb-1">
          <Image src="/JobJays_logo.png" alt="JobJays Logo" width={73} height={60} />
        </div>

        {/* Login Header */}
        <h2 className="text-3xl font-bold mb-4">Log In</h2>
        <p className="text-gray-500 mb-8">
          Don&apos;t have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
        </p>

        {/* Tabs for Candidate and Employer */}
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

        {/* Login based on tab (candidate vs employer) */}
        {selectedTab === "Employer" ? (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
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
              <button className="px-6 py-3 bg-blue-400 text-white rounded-md mt-4">
                <h2 className="font-bold">Log in</h2>
              </button>
            </form>
        ) : (
            <form className="flex flex-col gap-4" onSubmit={handleCandidateSubmit}>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
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
              <button className="px-6 py-3 bg-blue-400 text-white rounded-md mt-4">
                <h2 className="font-bold">Log in</h2>
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
            Welcome Back! Let&apos;s get you logged in.
          </h3>
          <div className="flex gap-8 justify-center">
          </div>
        </div>
      </div>
    </section>
  );
}
