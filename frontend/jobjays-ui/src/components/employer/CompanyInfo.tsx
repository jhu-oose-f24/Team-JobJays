import React, { useState } from 'react';
import styles from '@/styles/company-info.module.css';

export interface CompanyInfoData {
    companyName: string;
    aboutUs: string;
    logo: File | null;
    banner: File | null;
}

interface CompanyInfoProps {
    onSubmit: (data: CompanyInfoData) => void;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ onSubmit }) => {
    const [companyName, setCompanyName] = useState<string>('');
    const [aboutUs, setAboutUs] = useState<string>('');
    const [logo, setLogo] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);

    const handleSubmit = () => {
        const data: CompanyInfoData = { companyName, aboutUs, logo, banner };
        onSubmit(data);
    };

    const handleRemoveLogo = () => {
        setLogo(null);
    };

    const handleRemoveBanner = () => {
        setBanner(null);
    };

    return (
        <div className={styles.companyInfoContainer}>
            <input
                type="text"
                required={true}
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={styles.inputText}
            />
            <textarea
                required={true}
                placeholder="About Us"
                value={aboutUs}
                onChange={(e) => setAboutUs(e.target.value)}
                className={styles.textArea}
            />

            <div className={styles.fileUploadContainer}>
                <div className={styles.imageContainer}>
                    <p className={styles.logoHeading}>Logo</p>
                    {logo ? (
                        <div className={styles.imageWrapper}>
                            <img src={URL.createObjectURL(logo)} alt="Logo" className={styles.imagePreview} />
                            <button onClick={handleRemoveLogo} className={styles.removeButton}>
                                Remove
                            </button>
                            <button className={styles.replaceButton}>
                                Replace
                            </button>
                        </div>
                    ) : (
                        <input
                            type="file"
                            className={styles.fileInput}

                            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
                        />
                    )}
                </div>

                <div className={styles.imageContainer}>
                    <p>Banner</p>
                    {banner ? (
                        <div className={styles.imageWrapper}>
                            <img src={URL.createObjectURL(banner)} alt="Banner" className={styles.imagePreview} />
                            <button onClick={handleRemoveBanner} className={styles.removeButton}>
                                Remove
                            </button>
                            <button className={styles.replaceButton}>
                                Replace
                            </button>
                        </div>
                    ) : (
                        <input
                            type="file"
                            className={styles.fileInput}
                            onChange={(e) => setBanner(e.target.files ? e.target.files[0] : null)}
                        />
                    )}
                </div>
            </div>

            <button onClick={handleSubmit} className={styles.submitButton}>
                Save & Next
            </button>
        </div>
    );
};

export default CompanyInfo;
