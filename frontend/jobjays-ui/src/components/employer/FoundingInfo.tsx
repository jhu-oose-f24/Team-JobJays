import React, { useState } from 'react';
import styles from '@/styles/founding-info.module.css'; // CSS module import
export interface FoundingInfoData {
    organizationType: string;
    industryType: string;
    teamSize: string;
    yearOfEstablishment: string;
    companyWebsite: string;
    companyVision: string;
}

interface FoundingInfoProps {
    onSubmit?: (data: FoundingInfoData) => void;
}

const FoundingInfo: React.FC<FoundingInfoProps> = ({  }) => {
    const [organizationType, setOrganizationType] = useState<string>('');
    const [industryType, setIndustryType] = useState<string>('');
    const [teamSize, setTeamSize] = useState<string>('');
    const [yearOfEstablishment, setYearOfEstablishment] = useState<string>('');
    const [companyWebsite, setCompanyWebsite] = useState<string>('');
    const [companyVision, setCompanyVision] = useState<string>('');

    return (
        <div className={styles.companyInfoContainer}>
            <h3 className={styles.companyInfoTitle}>Founding Info</h3>

            {/* Input Fields Container */}
            <div className={styles.inputFieldsContainer}>
                {/* Row 1 */}
                <div className={styles.formGroup}>
                    <div>
                        <label htmlFor="organizationType">Organization Type</label>
                    </div>
                    <div>
                        <select
                            className={styles.customSelect}
                            id="organizationType"
                            value={organizationType}
                            onChange={(e) => setOrganizationType(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="gov">Government</option>
                            <option value="non-gov">Non-Government</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <div>
                        <label htmlFor="industryType">Industry Type</label>
                    </div>
                    <div>
                        <select
                            className={styles.customSelect}
                            id="industryType"
                            value={industryType}
                            onChange={(e) => setIndustryType(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="tech">Tech</option>
                            <option value="hardware">Hardware</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <div>
                        <label htmlFor="teamSize">Team Size</label>
                    </div>
                    <div>
                        <select
                            className={styles.customSelect}
                            id="teamSize"
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="1-10">1-10</option>
                            <option value="10-50">10-50</option>
                        </select>
                    </div>
                </div>

                {/* Row 2 */}
                <div className={styles.formGroup}>
                    <div>
                        <label htmlFor="yearOfEstablishment">Year of Establishment</label>
                    </div>
                    <div>
                        <input
                            type="date"
                            className={styles.inputText}
                            id="yearOfEstablishment"
                            value={yearOfEstablishment}
                            onChange={(e) => setYearOfEstablishment(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <div>
                        <label htmlFor="companyWebsite">Company Website</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            className={styles.inputText}
                            id="companyWebsite"
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                            placeholder="Website URL"
                        />
                    </div>
                </div>
            </div>

            {/* Company Vision */}
            <div className={styles.formGroup}>
                <div>
                    <label htmlFor="companyVision">Company Vision</label>
                </div>
                <div>
                    <textarea
                        className={styles.textArea}
                        id="companyVision"
                        value={companyVision}
                        onChange={(e) => setCompanyVision(e.target.value)}
                        placeholder="Tell us about the vision of your company..."
                    />
                </div>
            </div>

            <button className={styles.submitButton}>Save Changes</button>
        </div>
    );
};

export default FoundingInfo;
