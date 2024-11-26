"use client";
import CandidatesPage from "./application-view";
import {useParams} from "next/navigation";

export default function ViewApplicantsPage() {
  const {jobId} = useParams<{jobId: string}>();
  return <CandidatesPage jobId={Number(jobId)}/>
}
