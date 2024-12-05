'use client';

import React, { useState, useRef } from 'react';
import { PlusCircle, Trash, Upload, Save } from 'lucide-react';
import pdfToText from "react-pdftotext";
import {addApplicantSkills} from "@/lib/api";

export default function SkillsPage() {
    const [skills, setSkills] = useState<string[]>([]);
    const [inputSkill, setInputSkill] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleAddSkill = () => {
        if (inputSkill.trim() !== '' && !skills.includes(inputSkill.trim())) {
            setSkills([...skills, inputSkill.trim()]);
            setInputSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setIsUploading(true);

            try {
                // Extract text from PDF
                let resumeText = '';

                if (file.type === 'application/pdf') {
                    resumeText = await pdfToText(file);
                } else {
                    alert('Unsupported file type.');
                    setIsUploading(false);
                    return;
                }

                // Send the extracted text to your server-side API
                const response = await fetch('/api/skills_extract', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ resumeText }),
                });

                if (!response.ok) {
                    throw new Error('Error uploading file');
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                // Merge extracted skills with existing ones
                const newSkills = data.feedback.filter(
                    (skill: string) => !skills.includes(skill)
                );
                setSkills([...skills, ...newSkills]);
                alert('Skills extracted successfully!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('There was an error uploading your file. Please try again.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSaveSkills = async () => {
        setIsSaving(true);

        try {
            await addApplicantSkills(skills);
            alert('Skills saved successfully!');
            setSkills([]);
        } catch (error) {
            console.error('Error saving skills:', error);
            alert('There was an error saving your skills. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Your Skills</h1>
                    <p className="mt-2 text-gray-600">
                        Add your skills manually or upload your resume to extract skills.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    {/* Skill Input Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Skills Manually</h2>
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a skill and press Add"
                                value={inputSkill}
                                onChange={(e) => setInputSkill(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddSkill();
                                    }
                                }}
                            />
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
                                onClick={handleAddSkill}
                            >
                                <PlusCircle className="h-5 w-5 inline-block mr-1" />
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Resume Upload Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Resume to Extract Skills</h2>
                        <div className="flex items-center">
                            <label
                                htmlFor="resume-upload"
                                className="cursor-pointer bg-white rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none"
                            >
                                <Upload className="h-5 w-5 inline-block mr-1" />
                                {isUploading ? 'Uploading...' : 'Choose File'}
                            </label>
                            <input
                                id="resume-upload"
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={isUploading}
                            />
                            <span className="ml-4 text-gray-500">Supported formats: PDF</span>
                        </div>
                    </div>

                    {/* Skills List */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Skills</h2>
                        {skills.length > 0 ? (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="bg-white border border-gray-200 rounded-md p-4 flex items-center justify-between"
                                    >
                                        <span className="text-gray-800">{skill}</span>
                                        <button
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                            onClick={() => handleRemoveSkill(skill)}
                                        >
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No skills added yet.</p>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none flex items-center"
                            onClick={handleSaveSkills}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5 inline-block mr-2" />
                                    Save Skills
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
