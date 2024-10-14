// Preference.tsx
import React, { useState, useEffect } from 'react';
import {fetchPreference, updatePreference} from '../../lib/preference-api'
import styles from '../../styles/preference.module.css';

interface LocationDto {
    country: string;
    state: string;
    city: string;
}

interface NotificationPreferenceDto {
    notificationFrequency: string;
}

interface ApplicantPreferenceDto {
    applicantId: number;
    industries: string[];
    jobTitles: string[];
    minMonthlySalary: number;
    locations: LocationDto[];
    jobTypes: string[];
    workTimings: string[];
    notificationPreference: NotificationPreferenceDto;
}

const Preference: React.FC = () => {
    const [preferences, setPreferences] = useState<ApplicantPreferenceDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [industryInput, setIndustryInput] = useState<string>('');
    const [jobTitleInput, setJobTitleInput] = useState<string>('');
    const [industries, setIndustries] = useState<string[]>([]);
    const [jobTitles, setJobTitles] = useState<string[]>([]);

    useEffect(() => {
        // Fetch preference data when component mounts
        fetchPreference(1)
            .then((data) => {
                setPreferences(data);
                setIndustries(data.industries);
                setJobTitles(data.jobTitles);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    const handleUpdate = () => {
        // Handle updating preferences
        if (preferences) {
            const updatedPreferences = {
                ...preferences,
                industries,
                jobTitles,
            };
            updatePreference(updatedPreferences)
                .then((data) => setPreferences(data))
                .catch((error) => setError(error));

        }
    };

    const handleIndustryAdd = () => {
        if (industryInput.trim() !== '') {
            setIndustries([...industries, industryInput.trim()]);
            setIndustryInput('');
        }
    };

    const handleJobTitleAdd = () => {
        if (jobTitleInput.trim() !== '') {
            setJobTitles([...jobTitles, jobTitleInput.trim()]);
            setJobTitleInput('');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.preferenceContainer}>
            <h2>Applicant Preferences</h2>
            <div className={styles.preferenceForm}>
                <div className={styles.fieldGroup}>
                    <label>Industries:</label>
                    <input
                        type="text"
                        value={industryInput}
                        onChange={(e) => setIndustryInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleIndustryAdd()}
                    />
                    <button onClick={handleIndustryAdd}>Add Industry</button>
                    <div className={styles.tagContainer}>
                        {industries.map((industry, index) => (
                            <span key={index} className={styles.tag}>{industry}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label>Job Titles:</label>
                    <input
                        type="text"
                        value={jobTitleInput}
                        onChange={(e) => setJobTitleInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleJobTitleAdd()}
                    />
                    <button onClick={handleJobTitleAdd}>Add Job Title</button>
                    <div className={styles.tagContainer}>
                        {jobTitles.map((jobTitle, index) => (
                            <span key={index} className={styles.tag}>{jobTitle}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label>Min Monthly Salary:</label>
                    <input
                        type="number"
                        value={preferences?.minMonthlySalary}
                        onChange={(e) =>
                            setPreferences({ ...preferences!, minMonthlySalary: parseFloat(e.target.value) })
                        }
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label>Notification Frequency:</label>
                    <select
                        value={preferences?.notificationPreference.notificationFrequency}
                        onChange={(e) =>
                            setPreferences({
                                ...preferences!,
                                notificationPreference: {
                                    ...preferences.notificationPreference,
                                    notificationFrequency: e.target.value,
                                },
                            })
                        }
                    >
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                    </select>
                </div>
                <button className={styles.updateButton} onClick={handleUpdate}>
                    Update Preferences
                </button>
            </div>
        </div>
    );
};

export default Preference;
