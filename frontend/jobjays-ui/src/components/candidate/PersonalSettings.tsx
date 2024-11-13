import React, { useEffect, useState } from 'react';


interface DashboardPageProps {
    params: {
        candidate_id: string;
    };
}

const PersonalSettings: React.FC<DashboardPageProps> = ({ params }) => {

    // const candidateId = Number(localStorage.getItem('applicantId'));
    // console.log(candidateId);
    const [profilePicture, setProfilePicture] = useState(null);
    const [resumeFiles, setResumeFiles] = useState([]);
    const [candidateId, setCandidateId] = useState<number | null>(null);

    useEffect(() => {
        const isBrowser = typeof window !== "undefined";
        if (isBrowser && localStorage.getItem('applicantId')) {
            setCandidateId(Number(localStorage.getItem('applicantId')));

        }
    }, []);

    // Fetch all PDFs from the server
    const fetchPdfFiles = async () => {

        try {
            const response = await fetch(`http://localhost:8080/api/applicants/resume/fetch?applicantId=${candidateId}`, {
                method: "GET"
            });
            const data = await response.json();
            const files = data.resumes;
            console.log(files)
            setResumeFiles(files);
        } catch (error) {
            console.error("Error fetching PDF files:", error);
        }
    };

    // Call fetchPdfFiles initially to load PDFs on component mount
    useEffect(() => {
        fetchPdfFiles();
    }, []);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleResumeUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("applicantId", candidateId.toString());
        formData.append("resume", file);
        console.log(file.name);
        try {
            const response = await fetch("http://localhost:8080/api/applicants/resume", {
                method: "POST",
                body: formData
            });


            if (response.ok) {
                console.log(response);
                const applicantData = await response.json();
                console.log(applicantData);
                alert("Upload Successful!");
                fetchPdfFiles();
                //router.push(`employer/${employerId}/dashboard`); // redirect to new user's dashboard
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.failReason}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error}`);
        }

    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleDeleteResume = async (id) => {
        const formData = new FormData();
        formData.append("resumeId", id);
        try {
            const response = await fetch("http://localhost:8080/api/applicants/resume/delete", {
                method: "POST",
                body: formData
            });


            if (response.ok) {
                console.log(response);
                const applicantData = await response.json();
                console.log(applicantData);
                alert("Delete Successful!");
                fetchPdfFiles();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.failReason}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error}`);
        }
        //setResumeFiles(resumeFiles.filter((resume) => resume["resume_id"] !== id));
    };

    return (
        <div>
            <section style={{ marginTop: '30px' }}>
                <h3>Basic Information</h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
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
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <>
                                <input type="file" accept="image/*" onChange={handleFileChange}
                                    style={{ display: 'none' }} id="upload-profile" />
                                <label htmlFor="upload-profile" style={{ cursor: 'pointer', color: '#007bff' }}>
                                    Browse photo or drop here
                                </label>
                                <p>Max photo size 5 MB.</p>
                            </>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div style={{ flex: 1 }}>
                        <input type="text" placeholder="Full name"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                        <input type="text" placeholder="Title/headline"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                        <select style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
                            <option>Experience</option>
                            <option>1-2 years</option>
                            <option>3-5 years</option>
                            <option>5+ years</option>
                        </select>
                        <select style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
                            <option>Education</option>
                            <option>Bachelor's</option>
                            <option>Master's</option>
                            <option>PhD</option>
                        </select>
                        <input type="url" placeholder="Website URL"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
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
            <section style={{ marginTop: '30px' }}>
                <h3>Your CV/Resume</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {resumeFiles.map((resume) => (
                        <div key={resume["resume_id"]} style={{
                            border: '1px solid #ddd',
                            padding: '15px',
                            borderRadius: '5px',
                            position: 'relative'
                        }}>
                            <p>{resume["resumeName"]}</p>
                            <p style={{ color: '#888' }}>{resume["uploadedAt"]}</p>
                            <div style={{ position: 'relative', top: '10px', right: '10px', cursor: 'pointer' }}>
                                <button onClick={() => handleDeleteResume(resume["resume_id"])}
                                    style={{ color: 'red', border: 'none', background: 'none' }}>Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{ width: '150px', border: '1px dashed #ddd', padding: '15px', textAlign: 'center' }}>
                        <input type="file" accept="application/pdf" onChange={handleResumeUpload}
                            style={{ display: 'none' }} id="upload-resume" />
                        <label htmlFor="upload-resume" style={{ cursor: 'pointer', color: '#007bff' }}>
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