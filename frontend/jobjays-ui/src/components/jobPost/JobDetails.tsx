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
import {toast, useToast} from "@/hooks/use-toast";

import { cn } from "@/lib/utils"
import styles from "@/styles/postJob.module.css";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"



const formSchema = z.object({
    jobTitle: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    jobDescription: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
    jobType: z
        .string({
            required_error: "Please select a job type.",
        }),
    minSalary: z.number().min(10000, {
        message: "Minimum salary must be at least $10,000.",
    }),
    // @ts-ignore
    maxSalary: z.number().min(10000, {
        message: "Maximum salary must be greater than the Minimum Salary.",
    }),
    closedDate: z.date({
        required_error: "A date of birth is required.",
    }),
})


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


        // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            jobTitle: "",
            jobDescription: "",
            location: "",
            jobType: "",
            minSalary: 10000,
            maxSalary: 50000,
        },
    })

        // 2. Define a submit handler.
    function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }



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
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-y-auto max-h-[500px]">
                                        <FormField
                                            control={form.control}
                                            name="jobTitle"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Edit Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" id="jobTitle" placeholder="Edit job title, role, vacancies etc..." {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Edit your job title.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="jobDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Edit Job Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea id="jobDescription" placeholder="Edit Job Description, Responsibilities, etc..." rows={6} {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Edit your job description.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Edit Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" id="location" placeholder="Edit job location..." {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Edit your job location.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="jobType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select a Job Type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Full Time">Full Time</SelectItem>
                                                            <SelectItem value="Part Time">Part Time</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription>
                                                        Full or Part Time
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <h6>Set the Salary Range</h6>
                                        {/* Min Salary with dynamic value */}
                                        <FormField
                                            control={form.control}
                                            name="minSalary"
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className="text-sm text-muted-foreground py-6">Minimum:</FormLabel>
                                                    <FormControl>
                                                        <div className="relative mt-4">
                                                            <div
                                                                className="absolute bg-blue-400 text-white text-xs px-2 py-1 rounded"
                                                                style={{
                                                                    left: `calc(${(minSliderValue[0] / 1000000) * 100}% - 10px)`,
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
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Max Salary with dynamic value */}
                                        <FormField
                                            control={form.control}
                                            name="maxSalary"
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className="text-sm text-muted-foreground py-6">Maximum: </FormLabel>
                                                    <FormControl>
                                                        <div className="relative mt-4">
                                                            <div
                                                                className="absolute bg-blue-400 text-white text-xs px-2 py-1 rounded"
                                                                style={{
                                                                    left: `calc(${(maxSliderValue[0] / 1000000) * 100}% - 10px)`,
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
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="closedDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Edit Deadline</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button variant="outline" className="w-[240px] pl-3 text-left">
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/*<FormField*/}
                                        {/*    control={form.control}*/}
                                        {/*    name="closedDate"*/}
                                        {/*    render={({ field }) => (*/}
                                        {/*        <FormItem>*/}
                                        {/*            <FormLabel>Edit Deadline</FormLabel>*/}
                                        {/*            <FormControl>*/}
                                        {/*                <Input*/}
                                        {/*                    type="date"*/}
                                        {/*                    value={field.value}*/}
                                        {/*                    onChange={field.onChange}*/}
                                        {/*                    placeholder="Select a date"*/}
                                        {/*                />                                                    */}
                                        {/*            </FormControl>*/}
                                        {/*            <FormDescription>*/}
                                        {/*                Edit your job title.*/}
                                        {/*            </FormDescription>*/}
                                        {/*            <FormMessage />*/}
                                        {/*        </FormItem>*/}
                                        {/*    )}*/}
                                        {/*/>*/}

                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>

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
