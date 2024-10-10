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

import { Button } from "@/components/ui/button"


const JobDetails = () => {
    const [open, setOpen] = useState(false);

    const handleJobFormSubmit = (data: any) => {
        console.log("Form submitted:", data);
        // Add logic to send the form data as JSON to your backend API
        // e.g., axios.post('/api/job', data);
        setOpen(false); // Close the dialog after submission
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setOpen(true)}>Edit Job Details</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Job Details</DialogTitle>
                    </DialogHeader>
                    <JobForm onSubmit={handleJobFormSubmit} />
                </DialogContent>
            </Dialog>
        </div>
    );

    // return (
    //     <Dialog>
    //         <DialogTrigger asChild>
    //             <Button variant="outline">Share</Button>
    //         </DialogTrigger>
    //         <DialogContent className="sm:max-w-md overflow-y-auto max-h-[500px]">
    //             <DialogHeader>
    //                 <DialogTitle>Edit Job</DialogTitle>
    //                 <DialogDescription>
    //                     Enter in fields where you would like.
    //                 </DialogDescription>
    //             </DialogHeader>
    //             <div className="container mx-auto px-4 py-6">
    //                 <JobTitleForm onSubmit={handleJobTitleSubmit}/>
    //                 <JobLocationForm onSubmit={handleJobLocationSubmit}/>
    //                 <SalaryForm onSubmit={handleSalarySubmit}/>
    //                 <DateForm onSubmit={handleDateSubmit}/>
    //                 <Button onClick={handleSubmitToBackend}>Submit All Data</Button>
    //             </div>
    //             <DialogFooter className="sm:justify-start">
    //                 <DialogClose asChild>
    //                     <Button type="button" variant="secondary">
    //                         Close
    //                     </Button>
    //                 </DialogClose>
    //             </DialogFooter>
    //         </DialogContent>
    //     </Dialog>
    //
    // );
};

export default JobDetails;

// import React, {useState} from 'react';
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogFooter,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
//
// import { Button } from "@/components/ui/button"
// import JobTitleForm from "@/components/jobPost/jobPostTitleDescForm";
// import JobLocationForm from "@/components/jobPost/jobPostLocationForm";
// import SalaryForm from "@/components/jobPost/jobPostSalaryForm";
// import DateForm from "@/components/jobPost/jobPostDateForm"; // Replace with your Button component
//
// const JobDetailsDialog = () => {
//     const [jobTitleData, setJobTitleData] = useState({});
//     const [jobLocationData, setJobLocationData] = useState({});
//     const [salaryData, setSalaryData] = useState({});
//     const [dateData, setDateData] = useState({});
//     const [open, setOpen] = useState(false); // State to control dialog visibility
//
//     const handleJobTitleSubmit = (data: any) => {
//         setJobTitleData(data);
//     };
//
//     const handleJobLocationSubmit = (data: any) => {
//         setJobLocationData(data);
//     };
//
//     const handleSalarySubmit = (data: any) => {
//         setSalaryData(data);
//     };
//
//     const handleDateSubmit = (data: any) => {
//         setDateData(data);
//     };
//
//     const handleSubmitToBackend = () => {
//         const combinedData = {
//             ...jobTitleData,
//             ...jobLocationData,
//             ...salaryData,
//             ...dateData,
//         };
//
//         console.log("Submitting data: ", JSON.stringify(combinedData));
//
//         // Close the dialog after submitting
//         setOpen(false);
//     };
//
//     return (
//         <>
//             {/* Button to open dialog */}
//             <Button onClick={() => setOpen(true)}>Create Job Post</Button>
//
//             {/* Dialog component */}
//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Create Job Posting</DialogTitle>
//                     </DialogHeader>
//
//                     {/* Job Forms */}
//                     <JobTitleForm onSubmit={handleJobTitleSubmit} />
//                     <JobLocationForm onSubmit={handleJobLocationSubmit} />
//                     <SalaryForm onSubmit={handleSalarySubmit} />
//                     <DateForm onSubmit={handleDateSubmit} />
//
//                     {/* Footer with submission */}
//                     <DialogFooter>
//                         <Button onClick={handleSubmitToBackend}>Submit</Button>
//                         <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };
//
// export default JobDetailsDialog;

