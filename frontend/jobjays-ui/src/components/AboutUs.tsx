"use client";

import Image from 'next/image';
import { Users, Lightbulb, Target, Mail } from 'lucide-react';

const teamMembers = [
    {
        name: "Murad Azimzada",
        role: "Frontend Engineer",
        image: "/team1.jpg"
    },
    {
        name: "Ahmed Hashi",
        role: "Backend Developer",
        image: "/team2.jpg"
    },
    {
        name: "Enoch Appiah",
        role: "Backend Developer",
        image: "/team3.jpg"
    },
    {
        name: "Xinyang Li",
        role: "Frontend Engineer",
        image: "/team4.jpg"
    },
    {
        name: "Samuel Muzac",
        role: "Frontend Engineer",
        image: "/user.jpg"
    },
    {
        name: "Jiaxuan Luo",
        role: "Fullstack Developer",
        image: "/user.jpg"
    }
];

const philosophyPoints = [
    {
        icon: "👨‍💻",
        title: "User-Centered Design",
        description: "We prioritize the user in every step of the development process."
    },
    {
        icon: "🌍",
        title: "Innovation",
        description: "Always strive to stay ahead with the latest tech and trends."
    },
    {
        icon: "🤝",
        title: "Collaboration",
        description: "A strong, united team with shared goals can achieve amazing things."
    },
    {
        icon: "📈",
        title: "Continuous Improvement",
        description: "Learning and improving are at the core of our mission."
    }
];

const AboutUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen">


            {/* Philosophy Section */}
            {/* <section className="py-16 px-4 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Philosophy</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {philosophyPoints.map((point, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-4">{point.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                                <p className="text-gray-600">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                <div className="relative w-40 h-40 mx-auto mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold font-[family-name:var(--font-geist-mono)] mb-6">
                        About Us
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We are a team of passionate developers, dedicated to creating innovative web applications
                        that not only solve real-world problems but also provide seamless user experiences.
                        Our focus is on building scalable and maintainable applications with modern technologies.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            {/* <section className="py-16 px-4 bg-gray-100">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-50 rounded-full">
                                    <Target className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold">Mission</h3>
                            </div>
                            <p className="text-gray-600">
                                To empower businesses by building high-quality web applications that cater to
                                their unique needs, providing robust and scalable solutions.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-50 rounded-full">
                                    <Lightbulb className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold">Vision</h3>
                            </div>
                            <p className="text-gray-600">
                                To become leaders in the web development industry, recognized for our creativity,
                                innovation, and quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default AboutUs;