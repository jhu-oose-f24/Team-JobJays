"use client";

import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Building2, CalendarIcon, ChevronRight, ImagePlus, Settings, Share2, Trash2, Upload, Users} from "lucide-react";
import {ApplicantProfile} from "@/lib/types";
import FoundingInfo from "@/components/employer/FoundingInfo";
import SocialMediaInfo from "@/components/employer/SocialMediaInfo";
import AccountSettings from "@/components/employer/AccountSettings";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {DayPicker} from "react-day-picker";
import ReactDatePicker from "react-datepicker";
// import styles from "react-day-picker/style.css";

const ImageUploadCard = ({
                             title,
                             description,
                             image,
                             size,
                             aspectRatio = "aspect-square",
                             onRemove,
                             onUpload
                         }: {
    title: string;
    description: string;
    image: string;
    size: string;
    aspectRatio?: string;
    onRemove: () => void;
    onUpload: () => void;
}) => (
    <Card className="overflow-hidden">
        <CardHeader className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
            <div className={cn(
                "relative rounded-lg overflow-hidden border-2 border-dashed",
                "border-gray-200 hover:border-gray-300 transition-colors",
                aspectRatio
            )}>
                {image ? (
                    <>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                            <div className="flex h-full items-center justify-center space-x-2">
                                <Button variant="secondary" size="sm" onClick={onUpload}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Replace
                                </Button>
                                <Button variant="destructive" size="sm" onClick={onRemove}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <button
                        onClick={onUpload}
                        className="absolute inset-0 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors"
                    >
                        <ImagePlus className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500">Click to upload</span>
                    </button>
                )}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{size}</span>
                <span>Max size: 5MB</span>
            </div>
        </CardContent>
    </Card>
);

const NavigationItem = ({
                            icon: Icon,
                            title,
                            isActive,
                            onClick
                        }: {
    icon: any;
    title: string;
    isActive: boolean;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center w-full p-3 rounded-lg gap-3 transition-colors",
            "hover:bg-gray-100",
            isActive && "bg-primary/10 text-primary hover:bg-primary/10"
        )}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{title}</span>
        <ChevronRight className={cn(
            "w-4 h-4 ml-auto transition-transform",
            isActive && "transform rotate-90"
        )} />
    </button>
);

// Schema for ApplicantProfile
const applicantProfileSchema = z.object({
    name: z.string(),
    bio: z.string(),
    website: z.string().url(),
    title: z.string(),
    nationality: z.string(),
    gender: z.string(),
    education: z.string(),
    dateOfBirth: z.string().transform((val) => new Date(val).toISOString()),
    maritalStatus: z.string(),
    experience: z.string(),
});

type ApplicantProfileType = z.infer<typeof applicantProfileSchema>;

const EditApplicantProfile = ({ onSubmit, applicantProfile }: {
    onSubmit: (data: ApplicantProfileType) => void;
    applicantProfile: ApplicantProfile;
}) => {
    const [currentSection, setCurrentSection] = useState<'company-info' | 'founding-info' | 'social-media' | 'account-setting'>('company-info');
    const [logoFile, setLogoFile] = useState<string>("/company_logo.png");
    const [bannerFile, setBannerFile] = useState<string>("/company_ban.png");
    const [datePopoverOpen, setDatePopoverOpen] = useState(false);


    const form = useForm<ApplicantProfileType>({
        resolver: zodResolver(applicantProfileSchema),
        defaultValues: {
            name: `${applicantProfile.name}`,
            bio: `${applicantProfile.bio}`,
            website: `${applicantProfile.website}`,
            title: `${applicantProfile.title}`,
            nationality: `${applicantProfile.nationality}`,
            gender: `${applicantProfile.gender}`,
            education: `${applicantProfile.education}`,
            dateOfBirth: new Date(applicantProfile.dateOfBirth).toLocaleDateString("en-US"),
            maritalStatus: `${applicantProfile.maritalStatus}`,
            experience: `${applicantProfile.experience}`
        },
    });

    //TODO change navigation items names
    const navigationItems = [
        { id: 'company-info', title: 'Company Info', icon: Building2 },
        { id: 'founding-info', title: 'Founding Info', icon: Users },
        { id: 'social-media', title: 'Social Media', icon: Share2 },
        { id: 'account-setting', title: 'Account Settings', icon: Settings }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Settings className="w-6 h-6 text-primary"/>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                            <p className="text-sm text-gray-500">Manage your personal and professional details</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar Navigation */}
                    <div className="col-span-12 md:col-span-3">
                        <Card>
                            <CardContent className="p-4 space-y-1">
                                {navigationItems.map(item => (
                                    <NavigationItem
                                        key={item.id}
                                        icon={item.icon}
                                        title={item.title}
                                        isActive={currentSection === item.id}
                                        onClick={() => setCurrentSection(item.id as typeof currentSection)}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content Area */}
                    <div className="col-span-12 md:col-span-9 space-y-6">
                        {currentSection === 'company-info' && (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Company Details</CardTitle>
                                                <CardDescription>Basic information about your company</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="name"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Name</FormLabel>
                                                                    <Input {...field} placeholder="Enter your full name"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="bio"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Bio</FormLabel>
                                                                    <Textarea {...field} placeholder="Write a short bio"
                                                                              className="min-h-[100px]"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="website"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Website</FormLabel>
                                                                    <Input {...field} placeholder="Enter your website URL"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="title"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Title</FormLabel>
                                                                    <Input {...field} placeholder="Your professional title"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="nationality"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Nationality</FormLabel>
                                                                    <Input {...field} placeholder="Your nationality"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="gender"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Gender</FormLabel>
                                                                    <Input {...field} placeholder="Your gender"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="education"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Education</FormLabel>
                                                                    <Input {...field} placeholder="Your highest qualification"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="dateOfBirth"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Date of Birth</FormLabel>
                                                                    <Input {...field} placeholder="YYYY-MM-DD"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        {/*<FormField*/}
                                                        {/*    control={form.control}*/}
                                                        {/*    name="dateOfBirth"*/}
                                                        {/*    render={({ field }) => (*/}
                                                        {/*        <FormItem>*/}
                                                        {/*            <FormLabel>Date of Birth</FormLabel>*/}
                                                        {/*            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>*/}
                                                        {/*                <PopoverTrigger asChild>*/}
                                                        {/*                    <Button variant="outline">*/}
                                                        {/*                        {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}*/}
                                                        {/*                        <CalendarIcon className="ml-2" />*/}
                                                        {/*                    </Button>*/}
                                                        {/*                </PopoverTrigger>*/}
                                                        {/*                <PopoverContent>*/}
                                                        {/*                    <Calendar*/}
                                                        {/*                        mode="single"*/}
                                                        {/*                        selected={field.value ? new Date(field.value) : undefined}  // Convert string to Date*/}
                                                        {/*                        onSelect={(date) => {*/}
                                                        {/*                            field.onChange(date?.toISOString());  // Convert Date to ISO string for form value*/}
                                                        {/*                            setDatePopoverOpen(false);*/}
                                                        {/*                        }}*/}
                                                        {/*                        disabled={(date) => date >= new Date()}*/}
                                                        {/*                    />*/}
                                                        {/*                </PopoverContent>*/}
                                                        {/*            </Popover>*/}
                                                        {/*            <FormMessage />*/}
                                                        {/*        </FormItem>*/}
                                                        {/*    )}*/}
                                                        {/*/>*/}

                                                        <FormField
                                                            control={form.control}
                                                            name="maritalStatus"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Marital Status</FormLabel>
                                                                    <Input {...field} placeholder="Your marital status"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="experience"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <FormLabel>Experience</FormLabel>
                                                                    <Textarea {...field}
                                                                              placeholder="Describe your professional experience"
                                                                              className="min-h-[100px]"/>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />

                                                    </div>
                                                </div>


                                                <div className="flex justify-end">
                                                    <Button type={"submit"}>
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <div className="grid md:grid-cols-2 gap-6 ">
                                            <ImageUploadCard
                                                title="Company Logo"
                                                description="Upload your company logo (1:1 ratio recommended)"
                                                image={logoFile}
                                                size="3.5 MB"
                                                onRemove={() => setLogoFile("")}
                                                onUpload={() => {/* Implement upload logic */
                                                }}
                                            />
                                            <ImageUploadCard
                                                title="Company Banner"
                                                description="Upload a banner image (16:9 ratio recommended)"
                                                image={bannerFile}
                                                size="4.3 MB"
                                                aspectRatio="aspect-video"
                                                onRemove={() => setBannerFile("")}
                                                onUpload={() => {/* Implement upload logic */
                                                }}
                                            />
                                        </div>
                                    </>
                                </form>
                            </Form>
                        )}

                        {currentSection === 'founding-info' && <FoundingInfo />}
                        {currentSection === 'social-media' && <SocialMediaInfo />}
                        {currentSection === 'account-setting' && <AccountSettings />}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditApplicantProfile;
