// src/components/FeaturedJobs.tsx

const FeaturedJobs = () => {
    const jobs = [
        { title: 'Technical Support Specialist', type: 'Part-Time', salary: '$20,000 - $25,000', company: 'Google Inc.', location: 'Dhaka, Bangladesh' },
        // Add more job data as per Figma
    ];

    return (
        <section className="featured-jobs">
            <h2>Featured Jobs</h2>
            <div className="job-cards">
                {jobs.map((job, index) => (
                    <div key={index} className="job-card">
                        <h3>{job.title}</h3>
                        <p>{job.type}</p>
                        <p>{job.salary}</p>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedJobs;
