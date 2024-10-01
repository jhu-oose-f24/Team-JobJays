import styles from '@/styles/headerActions.module.css';
import Link from "next/link";
import Image from "next/image";
import ImageUrls  from "../ImageUrls";
import router from "next/router";

const HeaderActions = () => {
    return (
        <div className={styles.headerActions}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>
                    <i className="fas fa-briefcase"></i> {/* Placeholder for logo icon */}
                    <span>Job Jays</span>
                </div>
                <div className={styles.countrySelector}>
                    {/* <img src={"usa-flag.png"} alt="USA" className={styles.flag} /> Placeholder for flag image */}
                    <Image
                        src="/usa-flag.png"
                        alt="USA"
                        width={24}
                        height={24}
                        className={styles.flag}
                    />
                    <span>USA</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>

            <div className={styles.searchBar}>
                <i className="fas fa-search"></i> {/* Placeholder for search icon */}
                <input type="text" placeholder="Job title, keyword, company" />
            </div>
            <div className={styles.rightSection}>
                <button className={styles.signIn}>Sign In</button>
                <Link href="/employer/post-job" passHref>
                    <a className={styles.postJob}>Post A Job</a>
                </Link>
            </div>
        </div>
    );
};

export default HeaderActions;
