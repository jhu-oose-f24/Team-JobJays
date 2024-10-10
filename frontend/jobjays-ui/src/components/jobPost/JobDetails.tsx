"use client";
import React, {useState} from 'react';
import JobForm from "@/components/jobPost/JobForm";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast} from "@/hooks/use-toast";



import { Button } from "@/components/ui/button"

const JobDetails = () => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleJobFormSubmit = (data: any) => {
        console.log("Form submitted:", data);

        setOpen(false); // Close the dialog after submission
    };


    return (
        <div>
            <Dialog modal={false} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setOpen(true)}>Edit Job Details</Button>
                </DialogTrigger>
                <DialogContent className="overflow-y-auto max-h-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Job Details</DialogTitle>
                    </DialogHeader>
                    <JobForm onSubmit={handleJobFormSubmit} />
                </DialogContent>
            </Dialog>
        </div>
    );

};

export default JobDetails;

