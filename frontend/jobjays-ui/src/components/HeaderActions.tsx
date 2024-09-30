import styles from '@/styles/headerActions.module.css';
import Link from "next/link";
import Image from "next/image";
import ImageUrls  from "../ImageUrls";

const HeaderActions = () => {
    return (
        <div className={styles.headerActions}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>
                    <i className="fas fa-briefcase"></i> {/* Placeholder for logo icon */}
                    <span>Job Jays</span>
                </div>
                <div className={styles.countrySelector}>
                    <Image
                        src={ImageUrls.usaFlag}
                        width={10}
                        height={10} // Add the height attribute here
                        alt="USA"
                        className={styles.flag}
                    />
                    <span>USA</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>

            <div className={styles.searchBar}>
                <i className="fas fa-search"></i> {/* Placeholder for search icon */}
                <input type="text" placeholder="Job title, keyword, company"/>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.signIn}>Sign In</button>
                <Link href="/post_job" passHref>
                    <button className={styles.postJob}>Post A Job</button>
                </Link>
            </div>
        </div>
    );
};

export default HeaderActions;
