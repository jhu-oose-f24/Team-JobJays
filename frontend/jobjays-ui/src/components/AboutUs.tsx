// src/components/AboutUs.tsx
import styles from '@/styles/aboutUs.module.css'; // 引入 CSS 模块
import Image from 'next/image';
const AboutUs = () => {
    return (
        <div className={styles.container}>
            {/* 团队简介 */}
            <section className={styles.intro}>
                <h1>About Us</h1>
                <p>
                    We are a team of passionate developers, dedicated to creating innovative web applications
                    that not only solve real-world problems but also provide seamless user experiences.
                    Our focus is on building scalable and maintainable applications with modern technologies.
                </p>
            </section>

            {/* 团队理念 */}
            <section className={styles.philosophy}>
                <h2>Our Philosophy</h2>
                <ul>
                    <li>👨‍💻 <strong>User-Centered Design</strong>: We prioritize the user in every step of the development process.</li>
                    <li>🌍 <strong>Innovation</strong>: Always strive to stay ahead with the latest tech and trends.</li>
                    <li>🤝 <strong>Collaboration</strong>: A strong, united team with shared goals can achieve amazing things.</li>
                    <li>📈 <strong>Continuous Improvement</strong>: Learning and improving are at the core of our mission.</li>
                </ul>
            </section>

            {/* 照片墙 */}
            <section className={styles.photoWall}>
                <h2>Meet Our Team</h2>
                <div className={styles.photos}>
                    <div className={styles.photo}>
                        <div>
                          <Image src={"/team1.jpg" } alt="Team member 1" width={200} height={200} />
                        </div>
                        {/* <img src="/team1.jpg" alt="Team member 1" /> */}
                        <p>Murad Azimzada - Frontend Engineer</p>
                    </div>
                    <div className={styles.photo}>
                        <div>
                          <Image src={"/team2.jpg" } alt="Team member 2" width={200} height={200} />
                        </div>
                        {/* <img src="/images/team2.jpg" alt="Team member 2" /> */}
                        <p>Ahmed Hashi - Backend Developer</p>
                    </div>
                    <div className={styles.photo}>
                        {/* <img src="/images/team3.jpg" alt="Team member 3" /> */}
                        <div>
                          <Image src={"/team3.jpg" } alt="Team member 3" width={200} height={200} />
                        </div>
                        <p>Enoch Appiah - Backend Developer</p>
                    </div>
                    <div className={styles.photo}>
                        {/* <img src="/images/team4.jpg" alt="Team member 4" /> */}
                        <div>
                          <Image src={"/team4.jpg" } alt="Team member 4" width={200} height={200} />
                        </div>
                        <p>Xinyang Li - Frontend Engineer</p>
                    </div>
                    <div className={styles.photo}>
                        {/* <img src="/images/team4.jpg" alt="Team member 4" /> */}
                        <div>
                          <Image src={"/team5.jpg" } alt="Team member 5" width={200} height={200} />
                        </div>
                        <p>Samuel Muzac - Frontend Engineer</p>
                    </div>
                    <div className={styles.photo}>
                        {/* <img src="/images/team4.jpg" alt="Team member 4" /> */}
                        <div>
                          <Image src={"/team4.jpg" } alt="Team member 6" width={200} height={200} />
                        </div>
                        <p>Jiaxuan Luo - Fullstack Developer</p>
                    </div>
                </div>
            </section>

            {/* 愿景和使命 */}
            <section className={styles.mission}>
                <h2>Our Mission & Vision</h2>
                <p>
                    <strong>Mission:</strong> To empower businesses by building high-quality web applications that cater to
                    their unique needs, providing robust and scalable solutions.
                </p>
                <p>
                    <strong>Vision:</strong> To become leaders in the web development industry, recognized for our creativity,
                    innovation, and quality.
                </p>
            </section>

            {/* 联系信息 */}
            <section className={styles.contact}>
                <h2>Contact Us</h2>
                <p>
                    Have questions or want to collaborate? Feel free to <a href="/contact">get in touch with us</a>.
                </p>
            </section>
        </div>
    );
}

export default AboutUs;
