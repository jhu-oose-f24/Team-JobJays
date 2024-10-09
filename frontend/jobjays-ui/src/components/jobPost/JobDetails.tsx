"use client";
import React, {useState} from 'react';
import {useParams} from "next/navigation";
import {fetchJobPost, useUser} from "@/lib/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"



import styles from "@/styles/postJob.module.css";

interface JobDetailsProps {
    jobPost: {
        id: number; // The ID of the job post
        employerId: number; // The ID of the employer who posted the job
    };
}
const JobDetails = () => {
    //perhaps we can get User and check if they are logged in and if they are the employer of this post,
    //then we can show the edit button

    const { id } = useParams<{ id: string }>(); // Get the job ID from the route
    const { JobPost, isLoading, isError } = fetchJobPost(Number(id)); // Fetch job post data
    const [minSliderValue, setMinSliderValue] = useState<number[]>([50000]); // State to track the slider value //TODO change this later to the fetched values
    const [maxSliderValue, setMaxSliderValue] = useState<number[]>([100000]); // State to track the slider value //TODO change this later to the fetched values
    //const [date, setDate] = React.useState<Date>();
    const [dateString, setDateString] = useState<string>('');
    const [dateObject, setDateObject] = useState<Date | null>(null);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDateString(value);

        // Convert the string input to a Date object
        const newDate = new Date(value);
        setDateObject(newDate);
    };

    const handleSliderChange = (newValue: number[]) => {
        setMinSliderValue(newValue);
    };
    const handleMaxSliderChange = (newValue: number[]) => {
        setMaxSliderValue(newValue);
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading job details.</div>;
    if (!JobPost) return <div>Job not found.</div>;

    const handleActionClick = (jobId: number, action: string) => {
        console.log(`Job ${jobId} action: ${action}`);
    };


    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{JobPost.title}</h1>
                        <p className="text-gray-600">at {JobPost.companyName}</p>
                        <div className="flex space-x-2 mt-2">
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{JobPost.type}</span>
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Featured</span>
                        </div>
                    </div>
                    {/*/!* Conditionally render the "Edit" or "Apply" button based on user type *!/*/}
                    {/*{user?.role === 'Employer' && user.id === jobPost.employerId ? (*/}
                    {/*    <button>Edit Job Post</button>*/}
                    {/*) : (*/}
                    {/*    <button>Apply</button>*/}
                    {/*)}*/}
                    <div className="flex flex-col space-y-2">
                        <button className="px-4 py-2 bg-blue-400 text-white rounded-md">Apply Now</button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="px-4 py-2 bg-blue-400 text-white rounded-md">Edit Job</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Job Post</DialogTitle>
                                    <DialogDescription>
                                        Enter details below
                                    </DialogDescription>
                                </DialogHeader>
                                <Input
                                    type="text"
                                    id="jobTitle"
                                    placeholder="Add job title, role, vacancies etc."
                                />
                                <Textarea
                                    id="jobDescription"
                                    placeholder="Add Job Description, Responsibilities, etc."
                                    rows={6}
                                />
                                <Input
                                    type="text"
                                    id="location"
                                    placeholder="Add job location"
                                />
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Job Type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full Time">Full Time</SelectItem>
                                        <SelectItem value="Part Time">Part Time</SelectItem>
                                    </SelectContent>
                                </Select>
                                {/* MinSlider with dynamically updating value */}

                                <div>
                                    <h6 className="text-sm text-muted-foreground py-1">Set the Minimum Salary</h6>
                                </div>
                                <div className="relative mt-4 ">
                                    <div
                                        className="absolute bg-blue-400 text-white text-xs px-2 py-1 rounded"
                                        style={{
                                            left: `calc(${(minSliderValue[0] / 1000000) * 100}% - 10px)`, // Dynamically position tooltip based on value
                                            bottom: "15px",
                                        }}
                                    >
                                        ${minSliderValue[0].toLocaleString()}
                                    </div>
                                    <Slider
                                        value={minSliderValue}
                                        min={10000}
                                        max={1000000}
                                        step={10000}
                                        onValueChange={handleSliderChange}
                                        className="mt-2 "
                                    />
                                </div>
                                {/* MaxSlider with dynamically updating value */}

                                <div>
                                    <h6 className="text-sm text-muted-foreground py-1">Set the Maximum Salary</h6>
                                </div>
                                <div className="relative mt-4">
                                    <div
                                        className="absolute bg-blue-400 text-white text-xs px-2 py-1 rounded"
                                        style={{
                                            left: `calc(${(maxSliderValue[0] / 1000000) * 100}% - 10px)`, // Dynamically position tooltip based on value
                                            bottom: "15px",
                                        }}
                                    >
                                        ${maxSliderValue[0].toLocaleString()}
                                    </div>
                                    <Slider
                                        value={maxSliderValue}
                                        min={10000}
                                        max={1000000}
                                        step={10000}
                                        onValueChange={handleMaxSliderChange}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <h6 className="text-sm text-muted-foreground py-1">Set Deadline</h6>
                                </div>
                                {/*TODO fix Popup calendar, not nested right. Need to put all in form anyway */}
                                {/*<Popover >*/}
                                {/*    <PopoverTrigger asChild>*/}
                                {/*        <Button*/}
                                {/*            variant={"outline"}*/}
                                {/*            className={cn(*/}
                                {/*                "w-[280px] justify-start text-left font-normal",*/}
                                {/*                !date && "text-muted-foreground"*/}
                                {/*            )}*/}
                                {/*        >*/}
                                {/*            <CalendarIcon className="mr-2 h-4 w-4 "/>*/}
                                {/*            {date ? format(date, "PPP") : <span>Pick a date</span>}*/}
                                {/*        </Button>*/}
                                {/*    </PopoverTrigger>*/}
                                {/*    <PopoverContent className="w-auto p-0">*/}
                                {/*        <Calendar*/}
                                {/*            mode="single"*/}
                                {/*            selected={date}*/}
                                {/*            onSelect={setDate}*/}
                                {/*            initialFocus*/}
                                {/*            footer={*/}
                                {/*                date ? `Selected: ${date.toLocaleDateString()}` : "Pick a day."*/}
                                {/*            }*/}
                                {/*        />*/}
                                {/*    </PopoverContent>*/}
                                {/*</Popover>*/}
                                <Input
                                    type="date"
                                    value={dateString}
                                    onChange={handleDateChange}
                                    placeholder="Select a date"
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-bold">Job Description</h2>
                    <p className="mt-2">
                        {JobPost.description}
                    </p>
                    <ul className="list-disc list-inside mt-4">
                        <li>Great troubleshooting and analytical skills</li>
                        <li>3+ years of experience</li>
                        <li>Experience with HTML, JavaScript, CSS, PHP</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Salary and Job Overview */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold">Salary (USD)</h3>
                    <p className="text-xl font-bold">${JobPost.minSalary.toLocaleString()} - ${JobPost.maxSalary.toLocaleString()}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold">Job Overview</h3>
                    <ul>
                        <li>Date posted: {(new Date(JobPost.postedDate)).toDateString()}</li>
                        <li>Experience: $50k-$60k/month</li>
                        <li>Job level: Entry Level</li>
                        <li>Location: {JobPost.location}</li>
                    </ul>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-semibold">Share this job:</h3>
                    <div className="flex space-x-4 mt-2">
                        <button className="text-blue-600">Share on Facebook</button>
                        <button className="text-blue-500">Share on Twitter</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
