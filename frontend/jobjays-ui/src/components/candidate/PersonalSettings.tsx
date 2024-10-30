import React, { useState } from 'react';
// import styles from '@/styles/account-settings.module.css';


interface DashboardPageProps {
    params: {
        candidate_id: string;
    };
}

const PersonalSettings: React.FC<DashboardPageProps> = ({ params }) => {
    const candidateId = Number(params.candidate_id);
    console.log(candidateId);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [resumeFiles, setResumeFiles] = useState([
        { id: 1, name: 'Professional Resume', size: '3.5 MB' },
        { id: 2, name: 'Product Designer', size: '4.7 MB' },
        { id: 3, name: 'Visual Designer', size: '1.3 MB' },
    ]);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleResumeUpload = (event:any) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFiles([...resumeFiles, { id: Date.now(), name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` }]);
        }
    };

    const handleDeleteResume = (id:any) => {
        setResumeFiles(resumeFiles.filter((resume) => resume.id !== id));
    };

    return (
        <div>
            <section style={{marginTop: '30px'}}>
                <h3>Basic Information</h3>
                <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
                    {/* Profile Picture Upload */}
                    <div style={{
                        width: '200px',
                        height: '200px',
                        border: '1px dashed #ddd',
                        textAlign: 'center',
                        paddingTop: '50px'
                    }}>
                        {profilePicture ? (
                            <img src={profilePicture} alt="Profile"
                                 style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                        ) : (
                            <>
                                <input type="file" accept="image/*" onChange={handleFileChange}
                                       style={{display: 'none'}} id="upload-profile"/>
                                <label htmlFor="upload-profile" style={{cursor: 'pointer', color: '#007bff'}}>
                                    Browse photo or drop here
                                </label>
                                <p>Max photo size 5 MB.</p>
                            </>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div style={{flex: 1}}>
                        <input type="text" placeholder="Full name"
                               style={{width: '100%', padding: '10px', marginBottom: '10px'}}/>
                        <input type="text" placeholder="Title/headline"
                               style={{width: '100%', padding: '10px', marginBottom: '10px'}}/>
                        <select style={{width: '100%', padding: '10px', marginBottom: '10px'}}>
                            <option>Experience</option>
                            <option>1-2 years</option>
                            <option>3-5 years</option>
                            <option>5+ years</option>
                        </select>
                        <select style={{width: '100%', padding: '10px', marginBottom: '10px'}}>
                            <option>Education</option>
                            <option>Bachelor's</option>
                            <option>Master's</option>
                            <option>PhD</option>
                        </select>
                        <input type="url" placeholder="Website URL"
                               style={{width: '100%', padding: '10px', marginBottom: '10px'}}/>
                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px'
                        }}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>

            {/* Resume Section */}
            <section style={{marginTop: '30px'}}>
                <h3>Your CV/Resume</h3>
                <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    {resumeFiles.map((resume) => (
                        <div key={resume.id} style={{
                            border: '1px solid #ddd',
                            padding: '15px',
                            borderRadius: '5px',
                            position: 'relative'
                        }}>
                            <p>{resume.name}</p>
                            <p style={{color: '#888'}}>{resume.size}</p>
                            <div style={{position: 'relative', top: '10px', right: '10px', cursor: 'pointer'}}>
                                <button onClick={() => handleDeleteResume(resume.id)}
                                        style={{color: 'red', border: 'none', background: 'none'}}>Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{width: '150px', border: '1px dashed #ddd', padding: '15px', textAlign: 'center'}}>
                        <input type="file" accept="application/pdf" onChange={handleResumeUpload}
                               style={{display: 'none'}} id="upload-resume"/>
                        <label htmlFor="upload-resume" style={{cursor: 'pointer', color: '#007bff'}}>
                            Add CV/Resume
                        </label>
                        <p>Only PDF files</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PersonalSettings;