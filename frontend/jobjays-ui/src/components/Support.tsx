"use client"
import { useState } from 'react';
import styles from '@/styles/support.module.css'; // 引入 CSS 模块

const Support = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.supportContainer}>
            <h1>Support</h1>
            <p>If you have any questions, you may find the answers below. If not, feel free to reach out to us!</p>
            <div className={styles.accordionContainer}>
                {questions.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
                    >
                        <div
                            className={styles.accordionTitle}
                            onClick={() => toggleAccordion(index)}
                        >
                            <h3>{item.question}</h3>
                            <span>{activeIndex === index ? '-' : '+'}</span>
                        </div>
                        <div
                            className={styles.accordionContent}
                            style={{
                                maxHeight: activeIndex === index ? '150px' : '0px',
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease'
                            }}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Support;
