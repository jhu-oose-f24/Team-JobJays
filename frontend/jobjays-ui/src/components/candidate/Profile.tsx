// import React, { useEffect, useState } from 'react';
// import {useRouter} from "next/navigation";
// import {toast} from "@/hooks/use-toast";
//
//
// const ProfileData: React.FC = ({ }) => {
//
//     const router = useRouter();
//
//     const [formData, setFormData] = useState({
//         nationality: '',
//         gender: '',
//         education: '',
//         bio: '',
//         dateOfBirth: '',
//         maritalStatus: '',
//         experience: '',
//     });
//
//
//     // Call fetchPdfFiles initially to load PDFs on component mount
//     useEffect(() => {
//         fetchProfileData();
//     }, []);
//
//
//
//     // Fetch all PDFs from the server
//     const fetchProfileData = async () => {
//
//         try {
//             const response = await fetch(`http://localhost:8080/api/applicants/profile/${candidateId}`, {
//                 method: "GET"
//             });
//             const data = await response.json();
//             console.log(data)
//             setFormData(data);
//         } catch (error) {
//             console.error("Error fetching PDF files:", error);
//         }
//     };
//
//     // Update state when input values change
//     const handleChange = (e) => {
//         e.preventDefault();
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };
//
//     const candidateId = Number(localStorage.getItem('applicantId'));
//     console.log(candidateId);
//
//     if(candidateId==null || candidateId<0){
//         toast({
//             title: "Unauthorized",
//             description: "Please sign in first!",
//             variant: "default",
//         });
//         router.push(`signin`);
//     }
//
//     // Handle form submission
//     const handleSubmit = async () => {
//         console.log(formData);
//         try {
//             const response = await fetch(`http://localhost:8080/api/applicants/profile/${candidateId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData), // Send form data as JSON
//             });
//
//             const result = await response.json();
//             if (response.ok) {
//                 toast({
//                     title: "Success",
//                     description: "Data successfully submitted",
//                     variant: "default",
//                 });
//                 fetchProfileData();
//                 //router.push(`settings`);
//             } else {
//                 console.error('Error submitting data:', result);
//             }
//         } catch (error) {
//             console.error('Request failed:', error);
//         }
//     };
//
//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
//
//             {/* Form for Profile Information */}
//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium">Nationality</label>
//                         <select
//                             name="nationality"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                             value={formData.nationality}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select...</option>
//                             <option value="United States">United States</option>
//                             <option value="India">India</option>
//                             <option value="Canada">Canada</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium">Gender</label>
//                         <select
//                             name="gender"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                             value={formData.gender}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select...</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium">Education</label>
//                         <select
//                             name="education"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                             value={formData.education}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select...</option>
//                             <option value="Bachelor's">Bachelor's</option>
//                             <option value="Master's">Master's</option>
//                             <option value="PhD">PhD</option>
//                         </select>
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium">Biography</label>
//                         <textarea
//                             name="bio"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                             placeholder="Write down your biography here. Let the employers know who you are..."
//                             value={formData.bio}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium">Date of Birth</label>
//                         <input
//                             type="date"
//                             name="dateOfBirth"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                             value={formData.dateOfBirth}
//                             onChange={handleChange}
//                         />
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium">Marital Status</label>
//                         <select
//                             name="maritalStatus"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                             value={formData.maritalStatus}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select...</option>
//                             <option value="Single">Single</option>
//                             <option value="Married">Married</option>
//                             <option value="Divorced">Divorced</option>
//                         </select>
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium">Experience</label>
//                         <select
//                             name="experience"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                             value={formData.experience}
//                             onChange={handleChange}
//                         >
//                             <option value="">Select...</option>
//                             <option value="1-3 years">1-3 years</option>
//                             <option value="3-5 years">3-5 years</option>
//                             <option value="5+ years">5+ years</option>
//                         </select>
//                     </div>
//                 </div>
//
//                 <div className="col-span-2">
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Save Changes</button>
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// export default ProfileData;
