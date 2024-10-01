// src/components/ui/Footer.tsx
import styles from '@/styles/footer.module.css'; // 引入 CSS 模块
import Link from 'next/link';
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-content']}>
                <p>Job Jays © {new Date().getFullYear()}</p>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href= {"/support"}>Support</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

