// src/components/PostJob.tsx
"use client";
import styles from '@/styles/postJob.module.css';
import {createJobPost} from "@/lib/api";
import {useParams} from "next/navigation";
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import JobForm from "@/components/employer/JobForm";
import {useRouter } from "next/navigation";


const PostJob = () => {
    const { employerId } = useParams<{ employerId: string }>(); // Get the job ID from the route
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();


    const  handleJobFormSubmit = async (data: any) => {

        //We need to send the filteredData with proper attributes to backend for now until we have type in backend
        const {jobType, ...filteredData} = data;
        //JobPost.type = data.type;

        const result = await createJobPost(Number(employerId), filteredData);
        if (result.success) {
            setOpen(false);
            console.log(result.data.id)
            setTimeout(() => {
                router.push(`http://localhost:3000/post/jobs/${result.data.id}`);
            }, 2000);
            toast({
                title: "Success",
                description: "Job created successfully! Redirecting you now to the Job Page",
                variant: "default",
                duration: 2000,
            });

        } else {
            // Iterate through each error entry and create a separate toast for each
            for (let i = 0; i < Object.keys(result.error).length; i++) {
                const field = Object.keys(result.error)[i];
                const message = Object.values(result.error)[i];
                toast({
                    title: `Error in ${field}`,
                    description: `${message}`,
                    variant: "destructive",
                });
            }
        }
    }
    return (
        <div className={styles.postJobContainer}>
            <JobForm onSubmit={handleJobFormSubmit} />
        </div>

    );
};
export default PostJob;
