// src/components/JobStats.tsx

const JobStats = () => {
    return (
        <section className="job-stats">
            <div className="stat-box">
                <span>1,75,324</span>
                <p>Live Jobs</p>
            </div>
            <div className="stat-box">
                <span>97,354</span>
                <p>Companies</p>
            </div>
            <div className="stat-box">
                <span>38,471,154</span>
                <p>Candidates</p>
            </div>
            <div className="stat-box">
                <span>7,532</span>
                <p>New Jobs</p>
            </div>
        </section>
    );
};

export default JobStats;
