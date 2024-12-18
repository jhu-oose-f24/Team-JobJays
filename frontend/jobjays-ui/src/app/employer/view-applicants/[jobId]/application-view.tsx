"use client";
import React from 'react';
import { useJobApplicants } from '../../../../lib/api';
import { Applicant } from '../../../../lib/types';
import ErrorPage from "@/components/ui/ErrorPage";



const CandidatePage = ({jobId}: {jobId: number}) => {
  // const params = useParams();
  // const jobId = params?.id ? Number(params.id) : null;

  const { applicants, isLoading, isError } = useJobApplicants(jobId);

  if (isLoading) return <div>Loading applicants...</div>;
  if (isError) return <ErrorPage/>;
  if (!applicants || applicants.length === 0)
    return <div>No applicants found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Candidates Applied</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Username</th>
              <th className="py-3 px-4 border-b text-left">Bio</th>
              {/*<th className="py-3 px-4 border-b text-left">Applied Date</th>*/}
              {/*<th className="py-3 px-4 border-b text-left">Status</th>*/}
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant: Applicant) => (
              <tr key={applicant.applicantId} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">
                  {applicant.applicantProfile.name}
                </td>
                <td className="py-3 px-4 border-b">
                  {applicant.username}
                </td>
                <td className="py-3 px-4 border-b">
                  {applicant.applicantProfile.bio}
                </td>
                {/*<td className="py-3 px-4 border-b">*/}
                {/*  10/28/2024*/}
                {/*</td>*/}
                {/*<td className="py-3 px-4 border-b">*/}
                {/*  Reviewing...*/}
                {/*</td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatePage;
