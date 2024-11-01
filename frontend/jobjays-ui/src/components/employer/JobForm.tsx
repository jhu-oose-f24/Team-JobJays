import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname } from "next/navigation";

const jobFormSchema = z.object({
    title: z.string().nonempty("Job title is required"),
    description: z.string().nonempty("Job description is required"),
    location: z.object({
        city: z.string().nonempty("City is required"),
        state: z.string().nonempty("State is required"),
        country: z.string().nonempty("Country is required"),
    }),
    jobType: z.string().nonempty("Job type is required"), // On-site, Remote, Hybrid
    workTiming: z.string().nonempty("Work timing is required"), // Full-time, Part-time, Flexible
    minSalary: z.number().transform((val) => Number(val)),
    maxSalary: z.number().transform((val) => Number(val)),
    closedDate: z.string().transform((val) => new Date(val).toISOString()),
    skillsRequired: z.array(z.string()).min(1, "At least one skill is required")
});

type JobFormSchemaType = z.infer<typeof jobFormSchema>;

export const JobForm = ({ onSubmit }: { onSubmit: (data: JobFormSchemaType) => void }) => {
    const pathname = usePathname();
    const [datePopoverOpen, setDatePopoverOpen] = useState(false);

    const form = useForm<JobFormSchemaType>({
        resolver: zodResolver(jobFormSchema),
        defaultValues: {
            title: "",
            description: "",
            location: {
                city: "",
                state: "",
                country: "",
            },
            jobType: "",
            workTiming: "Full-time",
            minSalary: 10000,
            maxSalary: 50000,
            closedDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
            skillsRequired: [""], // Initialize with an empty skill
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "skillsRequired",
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-md shadow-md bg-white max-w-lg mx-auto">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <Input {...field} placeholder="Job Title" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <Input {...field} placeholder="Job Description" />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Skills Required Field */}
                <FormField
                    control={form.control}
                    name="skillsRequired"
                    render={() => (
                        <FormItem>
                            <FormLabel>Skills Required</FormLabel>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center space-x-2">
                                    <Input
                                        {...form.register(`skillsRequired.${index}` as const)}
                                        placeholder="Enter a skill"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="bg-red-500 text-white"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() => append("")}
                                className="mt-2 bg-blue-600 text-white"
                            >
                                Add Skill
                            </Button>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Location Fields */}
                <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <Input {...field} placeholder="Enter city" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location.state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <Input {...field} placeholder="Enter state" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location.country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Input {...field} placeholder="Enter country" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="jobType"*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Job Type</FormLabel>*/}
                {/*            <Select onValueChange={field.onChange} value={field.value}>*/}
                {/*                <FormControl>*/}
                {/*                    <SelectTrigger className="w-full">*/}
                {/*                        <SelectValue placeholder="Select a Job Type" />*/}
                {/*                    </SelectTrigger>*/}
                {/*                </FormControl>*/}
                {/*                <SelectContent>*/}
                {/*                    <SelectItem value="Onsite">On-site</SelectItem>*/}
                {/*                    <SelectItem value="Remote">Remote</SelectItem>*/}
                {/*                    <SelectItem value="Hybrid">Hybrid</SelectItem>*/}
                {/*                </SelectContent>*/}
                {/*            </Select>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <Controller
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <Select
                                onValueChange={(value) => { field.onChange(value);
                                console.log(value)}} // Update form state with selected value
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Job Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Onsite">On-site</SelectItem>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Work Timing Field */}
                <FormField
                    control={form.control}
                    name="workTiming"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Work Timing</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Work Timing" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Flexible">Flexible</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Minimum Salary Field */}
                <FormField
                    control={form.control}
                    name="minSalary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Minimum Salary</FormLabel>
                            <Input {...field} placeholder="Enter minimum salary" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Maximum Salary Field */}
                <FormField
                    control={form.control}
                    name="maxSalary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum Salary</FormLabel>
                            <Input {...field} placeholder="Enter maximum salary" />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Closed Date Field */}
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="closedDate"*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Deadline</FormLabel>*/}
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
                {/*                        // selected={new Date(field.value)}*/}
                {/*                        onSelect={(date) => {*/}
                {/*                            field.onChange(date);*/}
                {/*                            setDatePopoverOpen(false);*/}
                {/*                        }}*/}
                {/*                        disabled={(date) => date < new Date()}*/}
                {/*                    />*/}
                {/*                </PopoverContent>*/}
                {/*            </Popover>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}

                <FormField
                    control={form.control}
                    name="closedDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deadline</FormLabel>
                            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                                        <CalendarIcon className="ml-2" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={field.value ? new Date(field.value) : undefined}  // Convert string to Date
                                        onSelect={(date) => {
                                            field.onChange(date?.toISOString());  // Convert Date to ISO string for form value
                                            setDatePopoverOpen(false);
                                        }}
                                        disabled={(date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default JobForm;
