"use client"; // 确保组件可以使用 hooks

import { useState } from 'react';
import styles from '@/styles/contactus.module.css'; // 引入 CSS 模块

const ContactUs = () => {
    // 表单状态
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // 处理输入变化
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 表单提交
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className={styles.contactContainer}>
            {/* 左侧描述部分 */}
            <section className={styles.leftSection}>
                <h1>Get In Touch</h1>
                <p>
                    We&apos;re here to help and answer any question you might have. 
                    Please fill out the form on the right, and our team will get back to you shortly.
                </p>
                <div className={styles.contactInfo}>
                    <p><strong>Email:</strong> support@example.com</p>
                    <p><strong>Phone:</strong> +1 234 567 890</p>
                    <p><strong>Address:</strong> 1234 Street Name, City, State, ZIP</p>
                </div>
                <button className={styles.emailButton}>Email Us</button>
            </section>

            {/* 右侧表单部分 */}
            <section className={styles.rightSection}>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className={styles.inputField}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                        className={styles.inputField}
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={5}
                        required
                        className={styles.textareaField}
                    ></textarea>
                    <button type="submit" className={styles.submitButton}>
                        Send Message <span>✉️</span>
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;
