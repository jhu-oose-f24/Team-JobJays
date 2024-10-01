import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from '@/styles/dashboard.module.css';

const DashboardPage: React.FC = () => {
    return (
        <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Hello, Esther Howard</h1>
                <button className="px-4 py-2 bg-red-500 text-white rounded">
                    Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                    <h2 className="text-xl">589</h2>
                    <p>Applied Jobs</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded">
                    <h2 className="text-xl">238</h2>
                    <p>Favorite Jobs</p>
                </div>
                <div className="bg-green-100 p-4 rounded">
                    <h2 className="text-xl">574</h2>
                    <p>Job Alerts</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Recently Applied</h2>
                <div className="space-y-4">
                    <div className="border p-4 rounded">
                        <div className="flex justify-between">
                            <h3 className="font-bold">Junior Graphic Designer</h3>
                            <span className="text-green-500">Active</span>
                        </div>
                        <p>Brazil -$50k-$80k/month </p>
                        <p>Date Applied: Feb 2, 2024</p>
                    </div>
                    <div className="border p-4 rounded">
                        <div className="flex justify-between">
                            <h3 className="font-bold">Junior Graphic Designer</h3>
                            <span className="text-green-500">Active</span>
                        </div>
                        <p>Brazil -$50k-$80k/month </p>
                        <p>Date Applied: Feb 2, 2024</p>
                    </div>
                    <div className="border p-4 rounded">
                        <div className="flex justify-between">
                            <h3 className="font-bold">Junior Graphic Designer</h3>
                            <span className="text-green-500">Active</span>
                        </div>
                        <p>Brazil -$50k-$80k/month </p>
                        <p>Date Applied: Feb 2, 2024</p>
                    </div>
                    <div className="border p-4 rounded">
                        <div className="flex justify-between">
                            <h3 className="font-bold">Junior Graphic Designer</h3>
                            <span className="text-green-500">Active</span>
                        </div>
                        <p>Brazil -$50k-$80k/month </p>
                        <p>Date Applied: Feb 2, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
