"use client";

import { useState } from 'react';
import { Check, XCircle, Info, File, AlertTriangle } from "lucide-react";
import pdfToText from "react-pdftotext"; // Import the library

export default function ResumeCriticPage() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [feedback, setFeedback] = useState<{ positive_points: string[]; negative_points: string[] } | null>(null);
    const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Generate a preview URL for the resume
            const previewUrl = URL.createObjectURL(file);
            setResumePreviewUrl(previewUrl);

            setIsLoading(true);

            try {
                // Extract text from PDF
                let resumeText = '';

                if (file.type === 'application/pdf') {
                    // Use react-pdftotext to extract text from PDF
                    resumeText = await pdfToText(file);
                // } else if (
                //     file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                //     file.type === 'application/msword'
                // ) {
                //     // Handle DOCX files (optional)
                //     // Since react-pdftotext doesn't handle DOCX, you might need to use a different library or convert it on the server
                //     alert('DOC and DOCX files are currently not supported.');
                //     setIsLoading(false);
                //     return;
                } else {
                    alert('Unsupported file type.');
                    setIsLoading(false);
                    return;
                }

                // Send the extracted text to your server-side API
                const response = await fetch('/api/critic', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ resumeText }),
                });

                if (!response.ok) {
                    throw new Error('Error uploading file');
                }

                const data = await response.json();

                setFeedback(data.feedback);
                setFileUploaded(true);
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error (e.g., show a message to the user)
                alert('There was an error uploading your file. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-6">
                    <h1 className="text-3xl font-bold text-gray-800">Resume Critique Service</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-xl font-semibold text-gray-700">Analyzing your resume...</p>
                    </div>
                ) : !fileUploaded ? (
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="flex flex-col lg:flex-row items-start gap-10">
                            {/* Informational Section */}
                            <div className="w-full lg:w-1/2 flex-shrink-0">
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <Info className="h-6 w-6 text-blue-500 mr-2" />
                                        How to Use
                                    </h2>
                                    <p className="text-gray-700 mb-6">
                                        Upload your resume to receive AI-generated feedback. Our tool analyzes your
                                        resume's formatting, content, and overall effectiveness to help you improve your
                                        chances of landing your desired job.
                                    </p>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Guidelines:</h3>
                                    <ul className="space-y-3">
                                        {/* Supported File Types */}
                                        <li className="flex items-start">
                                            <File className="h-5 w-5 text-green-500 mr-3 mt-1" />
                                            <span className="text-gray-700">
                        <strong>Supported Formats:</strong> PDF
                      </span>
                                        </li>
                                        {/* Avoid Non-Resume Files */}
                                        <li className="flex items-start">
                                            <XCircle className="h-5 w-5 text-red-500 mr-3 mt-1" />
                                            <span className="text-gray-700">
                        <strong>Avoid Non-Resume Files:</strong> Please ensure you upload a valid resume document.
                      </span>
                                        </li>
                                        {/* AI Advice Disclaimer */}
                                        <li className="flex items-start">
                                            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-1" />
                                            <span className="text-gray-700">
                        <strong>Disclaimer:</strong> AI-generated feedback is for guidance purposes and should not be taken as absolute.
                      </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Upload Section */}
                            <div className="w-full lg:w-1/2 flex-shrink-0 h-full">
                                <label
                                    htmlFor="resume-upload"
                                    className="cursor-pointer bg-white rounded-lg shadow-lg p-10 text-center border border-dashed border-gray-300 hover:border-blue-500 transition h-full flex flex-col justify-center items-center"
                                >
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400 mb-4"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M24 8v16M16 16h16"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="text-xl font-semibold text-gray-700 mb-2">
                                        Drag & drop your resume here
                                    </p>
                                    <p className="text-gray-500 mb-4">or</p>
                                    <div
                                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                                        Choose File
                                    </div>
                                    <input
                                        id="resume-upload"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Side: Resume Preview */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Your Resume
                                </h2>
                                {/* Resume Preview */}
                                <div className="relative h-[700px] w-full border border-gray-200 rounded-md overflow-hidden">
                                    {resumePreviewUrl ? (

                                        <iframe
                                            src={resumePreviewUrl}
                                            className="absolute inset-0 w-full h-full"
                                            frameBorder="0"
                                        />
                                    ) : (
                                        <p className="text-center text-gray-500">Resume preview not available.</p>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Feedback */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Feedback
                                </h2>
                                {feedback ? (
                                    <ul className="space-y-4">
                                        {/* Positive Points */}
                                        {feedback.positive_points.map((point, index) => (
                                            <li key={`positive-${index}`} className="flex items-start bg-green-50 p-4 rounded-md">
                                                <Check className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                                                <div>
                                                    <p className="text-gray-800">{point}</p>
                                                </div>
                                            </li>
                                        ))}
                                        {/* Negative Points */}
                                        {feedback.negative_points.map((point, index) => (
                                            <li key={`negative-${index}`} className="flex items-start bg-red-50 p-4 rounded-md">
                                                <XCircle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
                                                <div>
                                                    <p className="text-gray-800">{point}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No feedback available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
