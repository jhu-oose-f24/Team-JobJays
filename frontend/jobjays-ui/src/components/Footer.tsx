// src/components/Footer.tsx

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>Job Jays © {new Date().getFullYear()}</p>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/support">Support</a></li>
                    <li><a href="/blog">Blog</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

