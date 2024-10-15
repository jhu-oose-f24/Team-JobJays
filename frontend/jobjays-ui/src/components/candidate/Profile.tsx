import React, { useState } from 'react';
import styles from '@/styles/founding-info.module.css'; // CSS module import
export interface ProfileData {
    nationality: string;
    gender: string;
    education: string;
    experience: string;
    dateOfBirth: string;
    maritalStatus: string;
    biography:string;
}

interface FoundingInfoProps {
    onSubmit?: (data: ProfileData) => void;
}

const ProfileData: React.FC<FoundingInfoProps> = ({  }) => {
    const [organizationType, setOrganizationType] = useState<string>('');
    const [industryType, setIndustryType] = useState<string>('');
    const [teamSize, setTeamSize] = useState<string>('');
    const [yearOfEstablishment, setYearOfEstablishment] = useState<string>('');
    const [companyWebsite, setCompanyWebsite] = useState<string>('');
    const [companyVision, setCompanyVision] = useState<string>('');


    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

            {/* Form for Profile Information */}
            <form onSubmit={onsubmit} className="grid grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nationality</label>
                        <select
                            name="nationality"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option>Select...</option>
                            <option>United States</option>
                            <option>India</option>
                            <option>Canada</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option>Select...</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Education</label>
                        <select
                            name="education"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option>Select...</option>
                            <option>Bachelor's</option>
                            <option>Master's</option>
                            <option>PhD</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Biography</label>
                        <textarea
                            name="biography"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            placeholder="Write down your biography here. Let the employers know who you are..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Marital Status</label>
                        <select
                            name="maritalStatus"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option>Select...</option>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Divorced</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Experience</label>
                        <select
                            name="experience"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option>Select...</option>
                            <option>1-3 years</option>
                            <option>3-5 years</option>
                            <option>5+ years</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileData;
