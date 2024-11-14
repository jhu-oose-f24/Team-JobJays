// src/components/Navbar.tsx
import Link from 'next/link';
import styles from '@/styles/navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/find-job">Find Job</Link></li>
                <li><Link href="/employers">Employers</Link></li>
                <li><Link href="/candidates">Candidates</Link></li>
                <li><Link href="/pricing-plans">Pricing Plans</Link></li>
                <li><Link href="/customer-support">Customer Supports</Link></li>
            </ul>

            <div className={styles.navRight}>
                <div className={styles.phone}>
                    <i className="fas fa-phone-alt"></i> +1-202-555-0178
                </div>
                <div className={styles.language}>
                    <span className={styles.flag}>🇺🇸</span>
                    <select className={styles.languageDropdown}>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                    </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

