import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";// Replace with your UI components
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import React, {useState} from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


// Job Form Schema using Zod
const jobFormSchema = z.object({
    jobTitle: z.string(),
    jobDescription: z.string(),
    location: z.string(),
    jobType: z.string(),
    minSalary: z.string().transform((val) => Number(val)),
    maxSalary: z.string().transform((val) => Number(val)),
    closedDate: z.date().transform((val) => new Date(val).toISOString()),
});

export const JobTitleForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm({
    resolver: zodResolver(jobFormSchema),
      defaultValues: {
          jobTitle: "",
          jobDescription: "",
          location: "",
          jobType: "",
          minSalary: "10000",
          maxSalary: "50000",
          closedDate: new Date(),
      },
  });

    const [datePopoverOpen, setDatePopoverOpen] = useState(false);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <Input {...field} placeholder="Job Title"/>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <Input {...field} placeholder="Job Description"/>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/* Location Field */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter location" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Job Type Field */}
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
                {/* Minimum Salary Field */}
                <FormField
                    control={form.control}
                    name="minSalary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Minimum Salary</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter minimum salary" />
                            </FormControl>
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
                            <FormControl>
                                <Input {...field} placeholder="Enter maximum salary" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Closed Date Field */}
                <FormField
                    control={form.control}
                    name="closedDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deadline</FormLabel>
                            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                                        <CalendarIcon className="ml-2" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>

    );
};
export default JobTitleForm;

