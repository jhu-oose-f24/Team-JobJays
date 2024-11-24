"use client";
import React from 'react';
import {updateApplicantProfile, useApplicant} from "@/lib/api";
import EditCandidateProfile from "@/components/candidate/EditCandidateProfile";
import {useToast} from "@/hooks/use-toast";

const ProfilePage = () => {
    const {toast} = useToast();
    const { applicantProfile, isLoading, isError, mutate } = useApplicant();

    if (isLoading) return <div>Loading profile...</div>;
    if (isError) return <div>Error loading profile.</div>;


    //TODO handle api call to update profile
    const handleEditProfileSubmit = async (data: any) => {
        console.log(data);
        const result = await updateApplicantProfile(data, mutate, data);
        if (result.success) {
            // setOpen(false); // Close the dialog
            toast({
                title: "Success",
                description: "Profile details updated successfully!",
                variant: "default",
            });
        } else {
            toast({
                title: "Error",
                description: `Failed to update profile. Message: ${result.error.message}, Code: ${result.error.status}`,
                variant: "destructive",
            });
        }
    };

    return (
        <EditCandidateProfile onSubmit={handleEditProfileSubmit} applicantProfile={applicantProfile}/>
    );
};
export default  ProfilePage;
