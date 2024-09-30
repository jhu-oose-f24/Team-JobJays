import React, { useState } from 'react';
import styles from '@/styles/post-job.module.css';

const PostJob: React.FC = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [tags, setTags] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [jobType, setJobType] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [jobLevel, setJobLevel] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [isRemote, setIsRemote] = useState(false);
    const [jobBenefits, setJobBenefits] = useState<string[]>([]);
    const [jobDescription, setJobDescription] = useState('');
    const [applyJobOn, setApplyJobOn] = useState('jobpilot');

    const benefitsList = [
        "401k Salary", "Distributed Team", "Async", "Vision Insurance",
        "Dental Insurance", "Medical Insurance", "Unlimited vacation",
        "4 day workweek", "401k matching", "Company retreats",
        "Learning budget", "Free gym membership", "Pay in crypto",
        "Profit Sharing", "Equity Compensation", "No whiteboard interview",
        "No politics at work", "We hire old (and young)"
    ];

    const toggleBenefit = (benefit: string) => {
        if (jobBenefits.includes(benefit)) {
            setJobBenefits(jobBenefits.filter(b => b !== benefit));
        } else {
            setJobBenefits([...jobBenefits, benefit]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to submit form
        console.log({
            jobTitle,
            tags,
            jobRole,
            minSalary,
            maxSalary,
            salaryType,
            education,
            experience,
            jobType,
            vacancies,
            expirationDate,
            jobLevel,
            country,
            city,
            isRemote,
            jobBenefits,
            jobDescription,
            applyJobOn
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Post a job</h2>
            <form className={styles.jobForm} onSubmit={handleSubmit}>
                {/* Job Information */}
                <div className={styles.section}>
                    <div className={styles.formGroup}>
                        <label>Job Title</label>
                        <input
                            type="text"
                            placeholder="Add job title, role, vacancies etc"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Tags</label>
                        <input
                            type="text"
                            placeholder="Add job keyword, tags etc..."
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Job Role</label>
                        <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                        </select>
                    </div>
                </div>

                {/* Salary Information */}
                <div className={styles.section}>
                    <div className={styles.formGroup}>
                        <label>Min Salary</label>
                        <input
                            type="text"
                            placeholder="Minimum salary"
                            value={minSalary}
                            onChange={(e) => setMinSalary(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Max Salary</label>
                        <input
                            type="text"
                            placeholder="Maximum salary"
                            value={maxSalary}
                            onChange={(e) => setMaxSalary(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Salary Type</label>
                        <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="hourly">Hourly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>

                {/* Advanced Information */}
                <div className={styles.section}>
                    <div className={styles.formGroup}>
                        <label>Education</label>
                        <select value={education} onChange={(e) => setEducation(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="bachelor">Bachelor's</option>
                            <option value="master">Master's</option>
                            <option value="phd">PhD</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Experience</label>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Job Type</label>
                        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Vacancies</label>
                        <input
                            type="text"
                            placeholder="Number of vacancies"
                            value={vacancies}
                            onChange={(e) => setVacancies(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Expiration Date</label>
                        <input
                            type="date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Job Level</label>
                        <select value={jobLevel} onChange={(e) => setJobLevel(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="entry">Entry level</option>
                            <option value="mid">Mid level</option>
                            <option value="senior">Senior level</option>
                        </select>
                    </div>
                </div>

                {/* Location Information */}
                <div className={`${styles.section} ${styles.locationSection}`}>
                    <div className={styles.formGroup}>
                        <label>Country</label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="usa">United States</option>
                            <option value="canada">Canada</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>City</label>
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isRemote}
                                onChange={() => setIsRemote(!isRemote)}
                            />
                            Fully Remote Position - Worldwide
                        </label>
                    </div>
                </div>

                {/* Job Benefits */}
                <div className={styles.section}>
                    <label>Job Benefits</label>
                    <div className={styles.benefitsContainer}>
                        {benefitsList.map((benefit) => (
                            <button
                                key={benefit}
                                type="button"
                                className={`${styles.benefit} ${jobBenefits.includes(benefit) ? styles.activeBenefit : ''}`}
                                onClick={() => toggleBenefit(benefit)}
                            >
                                {benefit}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Job Description */}
                <div className={styles.section}>
                    <label>Job Description</label>
                    <textarea
                        placeholder="Add your job description..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                {/* Apply Job On */}
                <div className={styles.section}>
                    <label>Apply Job on:</label>
                    <div className={styles.applyJobOptions}>
                        <label>
                            <input
                                type="radio"
                                name="applyJobOn"
                                value="jobpilot"
                                checked={applyJobOn === 'jobpilot'}
                                onChange={(e) => setApplyJobOn(e.target.value)}
                            />
                            On Jobpilot
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="applyJobOn"
                                value="external"
                                checked={applyJobOn === 'external'}
                                onChange={(e) => setApplyJobOn(e.target.value)}
                            />
                            External Platform
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="applyJobOn"
                                value="email"
                                checked={applyJobOn === 'email'}
                                onChange={(e) => setApplyJobOn(e.target.value)}
                            />
                            On Your Email
                        </label>
                    </div>
                </div>

                <button type="submit" className={styles.submitButton}>Post Job</button>
            </form>
        </div>
    );
};

export default PostJob;
