"use client";
import {useParams} from "next/navigation";
import {useEmployerFromUsername} from "@/lib/api";
import React from "react";
// import {useEmployer} from "@/lib/api";
// import Link from "next/link";
// import React from "react";
// import {Avatar, AvatarImage} from "@/components/ui/avatar";
//
//
const EmployerProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const {Employer, isLoading, isError} = useEmployerFromUsername(username);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data.</div>;

    const { name, bio } = Employer.employerProfile;
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 mb-4">
                        <img
                            src="/user.jpg" // Replace with actual profile picture URL if available
                            alt="Profile Picture"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{name}</h1>
                    <p className="text-gray-600 text-center">Bio: {bio}</p>
                    {/* Add Edit Profile Button */}
                    {/*<div className="mt-4">*/}
                    {/*    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">*/}
                    {/*        Edit Profile*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* Employer Info */}
//             <div className="bg-white shadow rounded-lg p-6 mb-8">
//                 <div className="flex flex-col items-center">
//                     <div className="w-32 h-32 mb-4">
//
//                         <img
//                             src="/user.jpg" // Replace with actual company logo URL if available
//                             alt="Company Logo"
//                             className="w-full h-full rounded-full object-cover"
//                         />
//                     </div>
//                     <h1 className="text-2xl font-bold mb-2">{EmployerProfile.name}</h1>
//                     <p className="text-gray-600 text-center">{EmployerProfile.bio}</p>
//                 </div>
//             </div>
//
//             {/* Job Posts */}
//             <div>
//                 <h2 className="text-2xl font-semibold mb-4">My Job Posts</h2>
//                 {EmployerProfile.jobPosts && EmployerProfile.jobPostsSize > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {EmployerProfile.jobPosts.map((job) => (
//                             <Link
//                                 key={job.id}
//                                 href={`/post/jobs/${job.id}`}
//                                 className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
//                             >
//                                 <h3 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h3>
//                                 <p className="text-gray-600 mb-4">{job.description.slice(0, 100)}...</p>
//                                 <div className="flex items-center justify-between">
//                                     <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                                         {job.type || 'Full Time'}
//                                     </span>
//                                     <div className="text-right">
//                                         <p className="text-gray-700">
//                                             {job.location.city}, {job.location.state}, {job.location.country}
//                                         </p>
//                                         <p className="text-gray-700">
//                                             Salary: ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center">
//                         <p className="text-gray-600">This employer has no jobs posted yet.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//
//         // <div className="p-8">
//         //     {/* Employer Profile Card */}
//         //     <div className="bg-white rounded-lg shadow p-6 mb-8 flex items-center">
//         //         <div>
//         //             <h1 className="text-2xl font-bold">{EmployerProfile.name}</h1>
//         //             <p className="text-gray-600">{EmployerProfile.bio}</p>
//         //             <p className="text-gray-800 mt-2">{EmployerProfile.jobPostsSize}</p>
//         //         </div>
//         //     </div>
//         //
//         //     {/* Jobs Grid */}
//         //     <h2 className="text-xl font-semibold mb-4">Job Openings</h2>
//         //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         //         {EmployerProfile.jobPosts.map((job) => (
//         //                 <Link
//         //                     key={job.id}
//         //                     href={`/post/jobs/${job.id}`}>
//         //                     <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-200">
//         //                         <h3 className="text-lg font-bold mb-1">{job.title}</h3>
//         //                         <p className="text-gray-600">{job.location.city}</p>
//         //                         <p className="text-gray-800 font-semibold mt-2">{job.salary}</p>
//         //                         <button className="mt-4 text-blue-600 hover:underline">View Details</button>
//         //                     </div>
//         //                 </Link>
//         //             )
//         //         )}
//         //     </div>
//         // </div>
//     );
}
//
export default EmployerProfilePage;
