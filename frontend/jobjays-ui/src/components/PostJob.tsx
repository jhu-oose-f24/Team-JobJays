"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { createJobPost } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import JobForm from "@/components/employer/JobForm";
import { ArrowLeft, Building2 } from "lucide-react";

const PostJob = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const handleJobFormSubmit = async (data: any) => {
    try {


      const result = await createJobPost(data);
      if (result.success) {
        setOpen(false);
        // console.log(result.data.id)
        setTimeout(() => {
          router.push(`/post/jobs/${result.data.id}`);
        }, 2000);
        toast({
          title: "Success",
          description: "Job created successfully! Redirecting you now to the Job Page",
          variant: "default",
          duration: 2000,
        });

        // setTimeout(() => {
        //   router.push(`/post/jobs/${result.data.id}`);
        // }, 2000);
      } else {
        Object.entries(result.error).forEach(([field, message]) => {
          toast({
            title: `Error in ${field}`,
            description: message as string,
            variant: "destructive",
          });
        });
      }
    }
    catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again. Error: " + error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          {/*<button*/}
          {/*  onClick={() => router.back()}*/}
          {/*  className="flex items-center text-gray-600 hover:text-gray-900 mb-4"*/}
          {/*>*/}
          {/*  <ArrowLeft className="w-4 h-4 mr-2" />*/}
          {/*  Back*/}
          {/*</button>*/}

          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Create a New Job Posting</h1>
          </div>
          <p className="text-gray-600">
            Fill in the details below to create a new job posting. Be as specific as possible
            to attract the right candidates.
          </p>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              All fields marked with an asterisk (*) are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobForm onSubmit={handleJobFormSubmit} />
          </CardContent>
        </Card>

        {/* Footer Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Need help? Contact our support team for assistance
        </div>
      </div>
    </div>
  );
};

export default PostJob;