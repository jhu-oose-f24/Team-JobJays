import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";


    const dateSchema = z.object({
        closedDate: z.date()
    });

    export const DateForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
        const [dateString, setDateString] = useState<string>('');
        const [dateObject, setDateObject] = useState<Date | null>(null);
        const form = useForm({
            resolver: zodResolver(dateSchema),
            defaultValues: {
                closedDate: new Date(),
            },
        });

        const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            console.log(value)
            setDateString(value);
            // Convert the string input to a Date object
            const newDate = new Date(value);
            setDateObject(newDate);
        };

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="closedDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Edit a Deadline</FormLabel>
                                <Input
                                    type="date"
                                    value={dateString}
                                    onChange={handleDateChange}
                                    placeholder="Select a date"
                                />
                                <FormDescription>
                                    Edit the deadline for your Job
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        );
    };
export default DateForm;

