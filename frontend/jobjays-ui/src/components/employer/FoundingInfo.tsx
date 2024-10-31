// import React, { useState } from 'react';
// import styles from '@/styles/founding-info.module.css'; // CSS module import
// export interface FoundingInfoData {
//     organizationType: string;
//     industryType: string;
//     teamSize: string;
//     yearOfEstablishment: string;
//     companyWebsite: string;
//     companyVision: string;
// }

// interface FoundingInfoProps {
//     onSubmit?: (data: FoundingInfoData) => void;
// }

// const FoundingInfo: React.FC<FoundingInfoProps> = ({  }) => {
//     const [organizationType, setOrganizationType] = useState<string>('');
//     const [industryType, setIndustryType] = useState<string>('');
//     const [teamSize, setTeamSize] = useState<string>('');
//     const [yearOfEstablishment, setYearOfEstablishment] = useState<string>('');
//     const [companyWebsite, setCompanyWebsite] = useState<string>('');
//     const [companyVision, setCompanyVision] = useState<string>('');

//     return (
//         <div className={styles.companyInfoContainer}>
//             <h3 className={styles.companyInfoTitle}>Founding Info</h3>

//             {/* Input Fields Container */}
//             <div className={styles.inputFieldsContainer}>
//                 {/* Row 1 */}
//                 <div className={styles.formGroup}>
//                     <div>
//                         <label htmlFor="organizationType">Organization Type</label>
//                     </div>
//                     <div>
//                         <select
//                             className={styles.customSelect}
//                             id="organizationType"
//                             value={organizationType}
//                             onChange={(e) => setOrganizationType(e.target.value)}
//                         >
//                             <option value="">Select...</option>
//                             <option value="gov">Government</option>
//                             <option value="non-gov">Non-Government</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className={styles.formGroup}>
//                     <div>
//                         <label htmlFor="industryType">Industry Type</label>
//                     </div>
//                     <div>
//                         <select
//                             className={styles.customSelect}
//                             id="industryType"
//                             value={industryType}
//                             onChange={(e) => setIndustryType(e.target.value)}
//                         >
//                             <option value="">Select...</option>
//                             <option value="tech">Tech</option>
//                             <option value="hardware">Hardware</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className={styles.formGroup}>
//                     <div>
//                         <label htmlFor="teamSize">Team Size</label>
//                     </div>
//                     <div>
//                         <select
//                             className={styles.customSelect}
//                             id="teamSize"
//                             value={teamSize}
//                             onChange={(e) => setTeamSize(e.target.value)}
//                         >
//                             <option value="">Select...</option>
//                             <option value="1-10">1-10</option>
//                             <option value="10-50">10-50</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Row 2 */}
//                 <div className={styles.formGroup}>
//                     <div>
//                         <label htmlFor="yearOfEstablishment">Year of Establishment</label>
//                     </div>
//                     <div>
//                         <input
//                             type="date"
//                             className={styles.inputText}
//                             id="yearOfEstablishment"
//                             value={yearOfEstablishment}
//                             onChange={(e) => setYearOfEstablishment(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <div className={styles.formGroup}>
//                     <div>
//                         <label htmlFor="companyWebsite">Company Website</label>
//                     </div>
//                     <div>
//                         <input
//                             type="text"
//                             className={styles.inputText}
//                             id="companyWebsite"
//                             value={companyWebsite}
//                             onChange={(e) => setCompanyWebsite(e.target.value)}
//                             placeholder="Website URL"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Company Vision */}
//             <div className={styles.formGroup}>
//                 <div>
//                     <label htmlFor="companyVision">Company Vision</label>
//                 </div>
//                 <div>
//                     <textarea
//                         className={styles.textArea}
//                         id="companyVision"
//                         value={companyVision}
//                         onChange={(e) => setCompanyVision(e.target.value)}
//                         placeholder="Tell us about the vision of your company..."
//                     />
//                 </div>
//             </div>

//             <button className={styles.submitButton}>Save Changes</button>
//         </div>
//     );
// };

// export default FoundingInfo;
"use client";

import React, { useState } from 'react';
import styles from '@/styles/founding-info.module.css';
import { Building } from 'lucide-react';

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

const FoundingInfo: React.FC<FoundingInfoProps> = ({ onSubmit }) => {
    const [organizationType, setOrganizationType] = useState<string>('');
    const [industryType, setIndustryType] = useState<string>('');
    const [teamSize, setTeamSize] = useState<string>('');
    const [yearOfEstablishment, setYearOfEstablishment] = useState<string>('');
    const [companyWebsite, setCompanyWebsite] = useState<string>('');
    const [companyVision, setCompanyVision] = useState<string>('');

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({
                organizationType,
                industryType,
                teamSize,
                yearOfEstablishment,
                companyWebsite,
                companyVision
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <Building size={20} />
                </div>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Founding Info</h1>
                    <p className={styles.description}>Please fill in your company's foundational details</p>
                </div>
            </div>

            <div className={styles.form}>
                <div className={styles.formField}>
                    <label className={styles.label}>Organization Type</label>
                    <select
                        value={organizationType}
                        onChange={(e) => setOrganizationType(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Select...</option>
                        <option value="gov">Government</option>
                        <option value="non-gov">Non-Government</option>
                    </select>
                </div>

                <div className={styles.formField}>
                    <label className={styles.label}>Industry Type</label>
                    <select
                        value={industryType}
                        onChange={(e) => setIndustryType(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Select...</option>
                        <option value="tech">Technology</option>
                        <option value="hardware">Hardware</option>
                    </select>
                </div>

                <div className={styles.formField}>
                    <label className={styles.label}>Team Size</label>
                    <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Select...</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                    </select>
                </div>

                <div className={styles.formField}>
                    <label className={styles.label}>Year of Establishment</label>
                    <input
                        type="date"
                        value={yearOfEstablishment}
                        onChange={(e) => setYearOfEstablishment(e.target.value)}
                        className={styles.input}
                        placeholder="yyyy/mm/dd"
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.label}>Company Website</label>
                    <input
                        type="url"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        className={styles.input}
                        placeholder="https://example.com"
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.label}>Company Vision</label>
                    <textarea
                        value={companyVision}
                        onChange={(e) => setCompanyVision(e.target.value)}
                        className={styles.textarea}
                        placeholder="Tell us about the vision of your company..."
                    />
                </div>

                <button onClick={handleSubmit} className={styles.button}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default FoundingInfo;