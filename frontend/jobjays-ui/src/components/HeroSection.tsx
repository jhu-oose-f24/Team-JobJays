// src/components/HeroSection.tsx

import styles from '@/styles/HeroSection.module.css';
const HeroSection = () => {
    return (
        <section className={styles.heroSection}>
            <h1>Find a job that suits your interest & skills.</h1>
            <p>Aliquam vitae turpis in diam convallis finibus in at risus. Nulla in scelerisque leo, eget sollicitudin velit.</p>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Job title, keyword..." />
                <input type="text" placeholder="Location" />
                <button className={styles.findJob}>Find Job</button>
            </div>
        </section>
    );
};

export default HeroSection;
