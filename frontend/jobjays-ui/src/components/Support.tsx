"use client";

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const Support = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const questions = [
        {
            question: "How do I reset my password?",
            answer: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions."
        },
        {
            question: "How can I contact support?",
            answer: "You can contact our support team by emailing support@example.com or calling +1 234 567 890."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept Visa, Mastercard, American Express, and PayPal."
        },
        {
            question: "How do I update my account information?",
            answer: "Go to your account settings and update your personal information there."
        },
        {
            question: "What is your refund policy?",
            answer: "We offer a 30-day money-back guarantee for all purchases. Contact support for further assistance."
        }
    ];

    const filteredQuestions = questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-100 p-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    {/* <div className="flex justify-center mb-6">
                        <div className="bg-blue-50 p-3 rounded-full">
                            <HelpCircle className="w-8 h-8 text-blue-400" />
                        </div>
                    </div> */}
                    <h1 className="text-4xl font-bold font-[family-name:var(--font-geist-mono)] mb-4">
                        Support Center
                    </h1>
                    <p className="text-gray-600 mb-8">
                        If you have any questions, you may find the answers below. If not, feel free to reach out to us!
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto mb-12">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-blue-400 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {filteredQuestions.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-gray-900 font-medium">{item.question}</span>
                                <ChevronDown 
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 
                                    ${activeIndex === index ? 'transform rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-200 ease-in-out
                                ${activeIndex === index ? 'max-h-40 py-4' : 'max-h-0'}`}
                            >
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="text-center mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
                    <p className="text-gray-600 mb-6">We're here to help you with anything you need</p>
                    <button className="px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Support;