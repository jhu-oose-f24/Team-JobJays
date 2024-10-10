import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {Slider} from "@/components/ui/slider";
import React, {useState} from "react";
import { Input } from "@/components/ui/input";


const salarySchema = z.object({
    minSalary: z.string().transform((val) => Number(val)),
    maxSalary: z.string().transform((val) => Number(val)),
});

export const SalaryForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const [minSliderValue, setMinSliderValue] = useState<number[]>([50000]); // State to track the slider value //TODO change this later to the fetched values
    const [maxSliderValue, setMaxSliderValue] = useState<number[]>([100000]); // State to track the slider value //TODO change this later to the fetched values

    const form = useForm({
        resolver: zodResolver(salarySchema),
        defaultValues: {
            minSalary: 10000,
            maxSalary: 50000,
        },
    });

    const handleSubmit = (data: any) => {
        onSubmit(Number(data));
    };

    const handleSliderChange = (newValue: number[]) => {
        setMinSliderValue(newValue);
    };
    const handleMaxSliderChange = (newValue: number[]) => {
        setMaxSliderValue(newValue);
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
                control={form.control}
                name="minSalary"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Minimum Salary</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Enter minimum salary"
                            />

                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="maxSalary"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Maximum Salary</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Enter maximum salary"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" variant="ghost">Save</Button>
        </form>
        </Form>
    );
};
export default SalaryForm;