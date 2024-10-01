// src/components/ui/Footer.tsx
import styles from '@/styles/footer.module.css'; // 引入 CSS 模块

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-content']}>
                <p>Job Jays © {new Date().getFullYear()}</p>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/support">Support</a></li>
                    {/* <li><a href="/blog">Blog</a></li> */}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

