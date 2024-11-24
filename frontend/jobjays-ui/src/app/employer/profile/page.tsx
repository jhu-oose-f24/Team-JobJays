// "use client";
//
// import React, { useState } from 'react';
// import Image from "next/image";
// import { cn } from "@/lib/utils";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Building2,
//   Users,
//   Share2,
//   Settings,
//   Upload,
//   ImagePlus,
//   Trash2,
//   ChevronRight
// } from "lucide-react";
// import FoundingInfo from "@/components/employer/FoundingInfo";
// import SocialMediaInfo from "@/components/employer/SocialMediaInfo";
// import AccountSettings from "@/components/employer/AccountSettings";
// import {z} from "zod";
// import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import {useEmployer} from "@/lib/api";
// import ErrorPage from "@/components/ui/ErrorPage";
//
// const ImageUploadCard = ({
//   title,
//   description,
//   image,
//   size,
//   aspectRatio = "aspect-square",
//   onRemove,
//   onUpload
// }: {
//   title: string;
//   description: string;
//   image: string;
//   size: string;
//   aspectRatio?: string;
//   onRemove: () => void;
//   onUpload: () => void;
// }) => (
//   <Card className="overflow-hidden">
//     <CardHeader className="space-y-1">
//       <CardTitle className="text-xl">{title}</CardTitle>
//       <CardDescription>{description}</CardDescription>
//     </CardHeader>
//     <CardContent className="space-y-4 p-6">
//       <div className={cn(
//         "relative rounded-lg overflow-hidden border-2 border-dashed",
//         "border-gray-200 hover:border-gray-300 transition-colors",
//         aspectRatio
//       )}>
//         {image ? (
//           <>
//             <Image
//               src={image}
//               alt={title}
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
//               <div className="flex h-full items-center justify-center space-x-2">
//                 <Button variant="secondary" size="sm" onClick={onUpload}>
//                   <Upload className="w-4 h-4 mr-2" />
//                   Replace
//                 </Button>
//                 <Button variant="destructive" size="sm" onClick={onRemove}>
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Remove
//                 </Button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <button
//             onClick={onUpload}
//             className="absolute inset-0 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors"
//           >
//             <ImagePlus className="w-8 h-8 text-gray-400" />
//             <span className="text-sm text-gray-500">Click to upload</span>
//           </button>
//         )}
//       </div>
//       <div className="flex items-center justify-between text-sm text-gray-500">
//         <span>{size}</span>
//         <span>Max size: 5MB</span>
//       </div>
//     </CardContent>
//   </Card>
// );
//
// const NavigationItem = ({
//   icon: Icon,
//   title,
//   isActive,
//   onClick
// }: {
//   icon: any;
//   title: string;
//   isActive: boolean;
//   onClick: () => void;
// }) => (
//   <button
//     onClick={onClick}
//     className={cn(
//       "flex items-center w-full p-3 rounded-lg gap-3 transition-colors",
//       "hover:bg-gray-100",
//       isActive && "bg-primary/10 text-primary hover:bg-primary/10"
//     )}
//   >
//     <Icon className="w-5 h-5" />
//     <span className="font-medium">{title}</span>
//     <ChevronRight className={cn(
//       "w-4 h-4 ml-auto transition-transform",
//       isActive && "transform rotate-90"
//     )} />
//   </button>
// );
//
// const jobFormSchema = z.object({
//   name: z.string(),
//   industry: z.string(),
//   bio: z.string(), // On-site, Remote, Hybrid
// });
// type JobFormSchemaType = z.infer<typeof jobFormSchema>;
//
// const ProfilePage = () => {
//   const [currentSection, setCurrentSection] = useState<'company-info' | 'founding-info' | 'social-media' | 'account-setting'>('company-info');
//   const [logoFile, setLogoFile] = useState<string>("/company_logo.png");
//   const [bannerFile, setBannerFile] = useState<string>("/company_ban.png");
//   const { EmployerProfile, isLoading, isError } = useEmployer();
//
//
//   if (isLoading) return <div>Loading profile...</div>;
//   if (isError) return <ErrorPage/>;
//
//   // const form = useForm<JobFormSchemaType>({
//   //   resolver: zodResolver(jobFormSchema),
//   //   defaultValues: {
//   //     name: `${EmployerProfile.name}`,
//   //     industry:`${EmployerProfile.industry}`,
//   //     bio: `${EmployerProfile.bio}`,
//   //
//   //   },
//   // });
//
//   const navigationItems = [
//     { id: 'company-info', title: 'Company Info', icon: Building2 },
//     { id: 'founding-info', title: 'Founding Info', icon: Users },
//     { id: 'social-media', title: 'Social Media', icon: Share2 },
//     { id: 'account-setting', title: 'Account Settings', icon: Settings }
//   ];
//
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between pb-6 border-b mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-primary/10">
//               <Settings className="w-6 h-6 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
//               <p className="text-sm text-gray-500">Manage your company profile and preferences</p>
//             </div>
//           </div>
//         </div>
//
//         {/* Main Content */}
//         <div className="grid grid-cols-12 gap-6">
//           {/* Sidebar Navigation */}
//           <div className="col-span-12 md:col-span-3">
//             <Card>
//               <CardContent className="p-4 space-y-1">
//                 {navigationItems.map(item => (
//                   <NavigationItem
//                     key={item.id}
//                     icon={item.icon}
//                     title={item.title}
//                     isActive={currentSection === item.id}
//                     onClick={() => setCurrentSection(item.id as typeof currentSection)}
//                   />
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//
//           {/* Content Area */}
//           <div className="col-span-12 md:col-span-9 space-y-6">
//             {currentSection === 'company-info' && (
//               <>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Company Details</CardTitle>
//                     <CardDescription>Basic information about your company</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="company-name">Company Name</Label>
//                         <Input
//                             id="company-name"
//                             placeholder="Enter your company name"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="company-name">Industry Name</Label>
//                         <Input
//                             id="industry-name"
//                             placeholder="Choose your industry"
//                         />
//                       </div>
//
//                       <div className="space-y-2">
//                         <Label htmlFor="about">About Us</Label>
//                         <Textarea
//                             id="about"
//                             placeholder="Write a compelling description of your company..."
//                             className="min-h-[150px] resize-y"
//                         />
//                       </div>
//                     </div>
//
//                     <div className="flex justify-end">
//                       <Button>
//                         Save Changes
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <div className="grid md:grid-cols-2 gap-6">
//                 <ImageUploadCard
//                     title="Company Logo"
//                     description="Upload your company logo (1:1 ratio recommended)"
//                     image={logoFile}
//                     size="3.5 MB"
//                     onRemove={() => setLogoFile("")}
//                     onUpload={() => {/* Implement upload logic */}}
//                   />
//                   <ImageUploadCard
//                     title="Company Banner"
//                     description="Upload a banner image (16:9 ratio recommended)"
//                     image={bannerFile}
//                     size="4.3 MB"
//                     aspectRatio="aspect-video"
//                     onRemove={() => setBannerFile("")}
//                     onUpload={() => {/* Implement upload logic */}}
//                   />
//                 </div>
//
//
//               </>
//             )}
//
//             {currentSection === 'founding-info' && <FoundingInfo />}
//             {currentSection === 'social-media' && <SocialMediaInfo />}
//             {currentSection === 'account-setting' && <AccountSettings />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default ProfilePage;
"use client";
import EditEmployerProfile from "@/components/employer/EditEmployerProfile";
import {updateEmployerProfile, useEmployer} from "@/lib/api";
import ErrorPage from "@/components/ui/ErrorPage";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const { EmployerProfile, isLoading, isError, mutate } = useEmployer();





  if (isLoading) return <div>Loading profile...</div>;
  if (isError) return <ErrorPage/>;

  // Handle job form submission
  const handleEditProfileSubmit = async (data: any) => {
    console.log(data);
    const result = await updateEmployerProfile(data, mutate, data);
    if (result.success) {
      // setOpen(false); // Close the dialog
      toast({
        title: "Success",
        description: "Profile details updated successfully!",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: `Failed to update profile. Message: ${result.error.message}, Code: ${result.error.status}`,
        variant: "destructive",
      });
    }
  };
  return (
      <EditEmployerProfile onSubmit={handleEditProfileSubmit} employerProfile={EmployerProfile} />
  );
};

export default ProfilePage;