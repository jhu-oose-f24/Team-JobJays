
import React, { useState, useEffect } from 'react';
import { fetchPreference, updatePreference } from '../../lib/preference-api';
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
    minMonthlySalary: string;
    skills: string[];
    locations: LocationDto[];
    jobTypes: string[];
    workTimings: string[];
    notificationPreference: NotificationPreferenceDto;
}

const Preference = () => {
    const [preferences, setPreferences] = useState<ApplicantPreferenceDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [industryInput, setIndustryInput] = useState<string>('');
    const [skillInput, setSkillInput] = useState<string>('');
    const [jobTitleInput, setJobTitleInput] = useState<string>('');
    const [locationInput, setLocationInput] = useState<LocationDto>({ country: '', state: '', city: '' });
    const [industries, setIndustries] = useState<string[]>([]);
    const [jobTitles, setJobTitles] = useState<string[]>([]);
    const [locations, setLocations] = useState<LocationDto[]>([]);
    const [jobTypes, setJobTypes] = useState<string[]>([]);
    const [workTimings, setWorkTimings] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    const availableJobTypes = ['Onsite', 'Remote', 'Hybrid'];
    const availableWorkTimings = ['Part-time', 'Full-time', 'Flexible'];

    useEffect(() => {
        fetchPreference()
            .then((data) => {
                setPreferences(data);
                setIndustries(data.industries);
                setJobTitles(data.jobTitles);
                setLocations(data.locations);
                setJobTypes(data.jobTypes);
                setWorkTimings(data.workTimings);
                setSkills(data.skills);
            })
            .catch((error) => setError(error.message || "An error occurred while fetching preferences."))
            .finally(() => setLoading(false));
    }, []);

    const handleUpdate = () => {
        if (preferences) {
            const updatedPreferences = {
                ...preferences,
                industries,
                jobTitles,
                locations,
                jobTypes,
                workTimings,
                skills,
                applicantId: localStorage.getItem('applicantId')
            };
            updatePreference(updatedPreferences)
                .then((data) => setPreferences(data))
                .catch((error) => setError(error.message || "An error occurred while updating preferences."));
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

    const handleSkillAdd = () => {
        if (skillInput.trim() !== '') {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleLocationAdd = () => {
        if (locationInput.country && locationInput.state && locationInput.city) {
            setLocations([...locations, locationInput]);
            setLocationInput({ country: '', state: '', city: '' });
        }
    };

    const handleJobTypeSelect = (jobType: string) => {
        if (!jobTypes.includes(jobType)) {
            setJobTypes([...jobTypes, jobType]);
        }
    };

    const handleWorkTimingSelect = (workTiming: string) => {
        if (!workTimings.includes(workTiming)) {
            setWorkTimings([...workTimings, workTiming]);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.preferenceContainer}>
            <h2>Applicant Preferences</h2>
            <div className={styles.preferenceForm}>
                {/* Industries Field Group */}
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

                {/* Job Titles Field Group */}
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

                {/* Skills Field Group */}
                <div className={styles.fieldGroup}>
                    <label>Skills :</label>
                    <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSkillAdd()}
                    />
                    <button onClick={handleSkillAdd}>Add Skill</button>
                    <div className={styles.tagContainer}>
                        {skills.map((skill, index) => (
                            <span key={index} className={styles.tag}>{skill}</span>
                        ))}
                    </div>
                </div>

                {/* Locations Field Group */}
                <div className={styles.fieldGroup}>
                    <label>Locations:</label>
                    <input
                        type="text"
                        placeholder="Country"
                        value={locationInput.country}
                        onChange={(e) => setLocationInput({ ...locationInput, country: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={locationInput.state}
                        onChange={(e) => setLocationInput({ ...locationInput, state: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={locationInput.city}
                        onChange={(e) => setLocationInput({ ...locationInput, city: e.target.value })}
                    />
                    <button onClick={handleLocationAdd}>Add Location</button>
                    <div className={styles.tagContainer}>
                        {locations.map((location, index) => (
                            <span key={index} className={styles.tag}>
                                {location.country}, {location.state}, {location.city}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Job Types Field Group */}
                <div className={styles.fieldGroup}>
                    <label>Job Types:</label>
                    <select onChange={(e) => handleJobTypeSelect(e.target.value)} defaultValue="">
                        <option value="" disabled>Select Job Type</option>
                        {availableJobTypes.map((jobType, index) => (
                            <option key={index} value={jobType}>{jobType}</option>
                        ))}
                    </select>
                    <div className={styles.tagContainer}>
                        {jobTypes.map((jobType, index) => (
                            <span key={index} className={styles.tag}>{jobType}</span>
                        ))}
                    </div>
                </div>

                {/* Work Timings Field Group */}
                <div className={styles.fieldGroup}>
                    <label>Work Timings:</label>
                    <select onChange={(e) => handleWorkTimingSelect(e.target.value)} defaultValue="">
                        <option value="" disabled>Select Work Timing</option>
                        {availableWorkTimings.map((workTiming, index) => (
                            <option key={index} value={workTiming}>{workTiming}</option>
                        ))}
                    </select>
                    <div className={styles.tagContainer}>
                        {workTimings.map((workTiming, index) => (
                            <span key={index} className={styles.tag}>{workTiming}</span>
                        ))}
                    </div>
                </div>

                {/* Min Monthly Salary Field Group */}
                <div className={styles.fieldGroup}>
                    <label>Min Monthly Salary:</label>
                    <input
                        value={preferences?.minMonthlySalary || ''}
                        onChange={(e) =>
                            setPreferences({
                                ...preferences!,
                                minMonthlySalary: e.target.value ? parseFloat(e.target.value) : 0
                            })
                        }
                    />
                </div>

                {/* Notification Frequency Field Group */}
                <div className={styles.fieldGroup}>
                    <label>Notification Frequency:</label>
                    <select
                        value={preferences?.notificationPreference.notificationFrequency}
                        onChange={(e) =>
                            setPreferences({
                                ...preferences!,
                                notificationPreference: {
                                    ...preferences?.notificationPreference,
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

                {/* Update Button */}
                <button className={styles.updateButton} onClick={handleUpdate}>
                    Update Preferences
                </button>
            </div>
        </div>
    );
};

export default Preference;
