"use client";

import React, { useState } from 'react';
import CompanyInfo from '@/components/employer/CompanyInfo';
import FoundingInfo from '@/components/employer/FoundingInfo';
import ContactInfo from '@/components/employer/ContactInfo';
import SuccessMessage from '@/components/employer/SuccessMessage';
import { CompanyInfoData } from '@/components/employer/CompanyInfo';
import { FoundingInfoData } from '@/components/employer/FoundingInfo';
import { ContactInfoData } from '@/components/employer/ContactInfo';
import styles from '@/styles/complete-sign-up.module.css';

type FormData = {
    companyInfo?: CompanyInfoData;
    foundingInfo?: FoundingInfoData;
    contactInfo?: ContactInfoData;
};

const CompleteSignUp: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({});

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleFormSubmit = (stepData: CompanyInfoData | FoundingInfoData | ContactInfoData) => {
        switch (currentStep) {
            case 1:
                setFormData(prev => ({ ...prev, companyInfo: stepData as CompanyInfoData }));
                break;
            case 2:
                setFormData(prev => ({ ...prev, foundingInfo: stepData as FoundingInfoData }));
                break;
            case 3:
                setFormData(prev => ({ ...prev, contactInfo: stepData as ContactInfoData }));
                break;
        }
        nextStep();
    };

    const isValidStep = () => {
        switch (currentStep) {
            case 1:
                return !!formData.companyInfo;
            case 2:
                return !!formData.foundingInfo;
            case 3:
                return !!formData.contactInfo;
            default:
                return true;
        }
    };

    const renderStep = () => {
        if(isValidStep()){
            console.log('valid')
        }
        switch (currentStep) {

            case 1:
                return <CompanyInfo onSubmit={handleFormSubmit} />;
            case 2:
                return <FoundingInfo onSubmit={handleFormSubmit} />;
            case 3:
                return <ContactInfo onSubmit={handleFormSubmit} onPrevious={prevStep} />;
            case 4:
                return <SuccessMessage />;
            default:
                return <CompanyInfo onSubmit={handleFormSubmit} />;
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Complete Your Sign-Up</h2>
            <ProgressBar currentStep={currentStep} />
            {renderStep()}
            {currentStep < 4 && (
                <div className={styles.buttonGroup}>
                    {currentStep > 1 && <button className={styles.btn} onClick={prevStep}>Previous</button>}
                    <button
                        className={styles.btn}
                        onClick={nextStep}
                        // disabled={!isValidStep()}
                    >
                        {currentStep === 3 ? 'Finish' : 'Next'}
                    </button>
                </div>
            )}
        </div>
    );
};

interface ProgressBarProps {
    currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const steps = ['Company Info', 'Founding Info', 'Contact Info', 'Complete'];
    const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBarFill} style={{ width: `${percentage}%` }} />
            <p>{steps[currentStep - 1]}</p>
        </div>
    );
};

export default CompleteSignUp;
