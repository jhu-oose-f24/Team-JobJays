"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <section className="bg-gray-100 p-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-[family-name:var(--font-geist-mono)] mb-4">
                        Get in touch with us
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions or want to collaborate? Fill out the form below, and our team will get back to you shortly.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Email Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-full">
                            <Mail className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Email</h3>
                            <p className="text-gray-600 text-sm">support@example.com</p>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-full">
                            <Phone className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Phone</h3>
                            <p className="text-gray-600 text-sm">+1 234 567 890</p>
                        </div>
                    </div>

                    {/* Address Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-full">
                            <MapPin className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Address</h3>
                            <p className="text-gray-600 text-sm">1234 Street Name, City</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-400"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-400"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-400"
                                placeholder="Enter subject"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-400 resize-none"
                                placeholder="Write your message here..."
                                required
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full md:w-auto px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                            >
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;