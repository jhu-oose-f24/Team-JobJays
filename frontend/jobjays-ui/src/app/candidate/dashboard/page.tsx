import React from 'react'
const user = {
    name: 'Esther Howard',
    appliedJobs: 589,
    favoriteJobs: 238,
    jobAlerts: 574,
    recentlyApplied: [
        {
            id: 1,
            title: 'Networking Engineer',
            type: 'Remote',
            location: 'Washington',
            salary: '$50k-80k/month',
            dateApplied: 'Feb 2, 2019 19:28',
            status: 'Active',
            logo: 'upwork.png',
        },
        {
            id: 2,
            title: 'Product Designer',
            type: 'Full Time',
            location: 'Dhaka',
            salary: '$50k-80k/month',
            dateApplied: 'Dec 7, 2019 23:26',
            status: 'Active',
            logo: 'dribbble.png',
        },
        {
            id: 3,
            title: 'Junior Graphic Designer',
            type: 'Temporary',
            location: 'Brazil',
            salary: '$50k-80k/month',
            dateApplied: 'Feb 2, 2019 19:28',
            status: 'Active',
            logo: 'apple.png',
        },
        {
            id: 4,
            title: 'Visual Designer',
            type: 'Contract Base',
            location: 'Wisconsin',
            salary: '$50k-80k/month',
            dateApplied: 'Dec 7, 2019 23:26',
            status: 'Active',
            logo: 'microsoft.png',
        },
    ]
};

function StatCard ({ title, count }) {
    return(
        <div style={{
            flex: 1,
            backgroundColor: '#f8f8f8',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
        }}>
            <h3>{count}</h3>
            <p>{title}</p>
        </div>
    );
}

function JobRow({ job }){
    return(
        <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={`/${job.logo}`} alt={`${job.title} logo`} style={{ width: '30px', height: '30px', borderRadius: '4px' }} />
                <div>
                    <strong>{job.title}</strong>
                    <br />
                    <small style={{ color: '#888' }}>{job.location} • {job.salary}</small>
                </div>
            </td>
            <td style={{ padding: '10px' }}>{job.dateApplied}</td>
            <td style={{ padding: '10px', color: job.status === 'Active' ? 'green' : 'red' }}>{job.status}</td>
            <td style={{ padding: '10px' }}>
                <button style={{ padding: '8px 12px', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '5px' }}>
                    View Details
                </button>
            </td>
        </tr>
    );
}

const DashboardPage: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Hello, {user.name}</h1>
            <p>Here is your daily activities and job alerts</p>

            {/* Stats Section */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <StatCard title="Applied jobs" count={user.appliedJobs} />
                <StatCard title="Favorite jobs" count={user.favoriteJobs} />
                <StatCard title="Job Alerts" count={user.jobAlerts} />
            </div>

            {/* Profile Reminder */}
            <div style={{ backgroundColor: '#ffdddd', padding: '15px', marginTop: '20px', borderRadius: '5px' }}>
                <p>Your profile editing is not completed.</p>
                <button style={{ padding: '10px', color: '#fff', backgroundColor: '#d9534f', border: 'none', borderRadius: '5px' }}>
                    Edit Profile
                </button>
            </div>

            {/* Recently Applied Jobs */}
            <h2 style={{ marginTop: '30px' }}>Recently Applied</h2>
            <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th>Job</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {user.recentlyApplied.map(job => (
                    <JobRow key={job.id} job={job} />
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DashboardPage;

