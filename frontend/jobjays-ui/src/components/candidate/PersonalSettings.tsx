import React, { useEffect, useState } from 'react';
import {toast} from "@/hooks/use-toast";


interface DashboardPageProps {
    params: {
        candidate_id: string;
    };
}

const PersonalSettings: React.FC<DashboardPageProps> = () => {
    const [candidateId, setCandidateId] = useState<number | null>(null);


    useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && localStorage.getItem('applicantId')) {
        setCandidateId(Number(localStorage.getItem('applicantId')));
        console.log(candidateId);
    }
    }, []);


    const [profilePicture, setProfilePicture] = useState(null);
    const [resumeFiles, setResumeFiles] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        website: '',
    });

    // Update state when input values change
    const handleChange = (e: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDeletePhoto = () => {
        // Send a DELETE request to remove the photo
        fetch(`http://localhost:8080/api/applicants/photo?applicantId=${candidateId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Photo deleted successfully');
                    // Remove the photo from the UI
                    setProfilePicture(null);
                } else {
                    console.error('Failed to delete photo');
                }
            })
            .catch((error) => {
                console.error('Error deleting the photo:', error);
            });
    };

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


    // Fetch all PDFs from the server
    const fetchProfilePicture = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/applicants/photos/${candidateId}`);
            if (response.ok) {
                const blob = await response.blob();  // Get the photo as a Blob
                const url = URL.createObjectURL(blob); // Create a URL for the Blob
                setProfilePicture(url); // Set the URL for the image
            } else {
                console.error('Failed to load the profile picture');
            }
        } catch (error) {
            console.error('Error fetching the profile picture:', error);
        }
    };


    // Fetch all PDFs from the server
    const fetchProfileData = async () => {

        try {
            const response = await fetch(`http://localhost:8080/api/applicants/profile/${candidateId}`, {
                method: "GET"
            });
            const data = await response.json();
            console.log(data)
            setFormData(data);
        } catch (error) {
            console.error("Error fetching PDF files:", error);
        }
    };


    // Call fetchPdfFiles initially to load PDFs on component mount
    // useEffect(() => {
    //     fetchProfileData();
    //     fetchPdfFiles();
    // }, []);

    // Fetch the profile picture when the component mounts
    useEffect(() => {
        fetchProfilePicture();
        fetchPdfFiles();
        fetchProfileData();
    }, [candidateId]); // Dependency array: runs when applicantId changes

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            formData.append('applicantId', candidateId);

            // Send the file to the server
            fetch('http://localhost:8080/api/applicants/photo', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Photo uploaded successfully');
                        // Optionally, you can call fetchProfilePicture again to refresh the displayed photo
                        fetchProfilePicture();
                    } else {
                        console.error('Failed to upload photo');
                    }
                })
                .catch((error) => {
                    console.error('Error uploading the photo:', error);
                });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`http://localhost:8080/api/applicants/profile/${candidateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send form data as JSON
            });

            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Data successfully submitted",
                    variant: "default",
                });
            } else {
                console.error('Error submitting data:', result);
            }
        } catch (error) {
            console.error('Request failed:', error);
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
            <section style={{marginTop: '30px'}}>
                <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
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
                            <>
                                <img src={profilePicture} alt="Profile"
                                     style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                <div>
                                    <button onClick={handleDeletePhoto} style={{marginTop: '10px', color: 'red'}}>
                                        Delete Photo
                                    </button>
                                </div>
                            </>
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
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
                        <div style={{flex: 1}}>
                            <input type="text" placeholder="Full name" value={formData.name} name="name"
                                   onChange={handleChange}
                                   style={{width: '100%', padding: '10px', marginBottom: '10px'}}/>
                            <input type="text" placeholder="Title/headline" value={formData.title} name="title"
                                   onChange={handleChange}
                                   style={{width: '100%', padding: '10px', marginBottom: '10px'}}/>
                            <input type="url" placeholder="Website URL" value={formData.website} name="website"
                                   onChange={handleChange}
                                   style={{width: '100%', padding: '10px', marginBottom: '10px'}}/>
                            <button style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px'
                            }} type={"submit"}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Resume Section */}
            <section style={{marginTop: '30px' }}>
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