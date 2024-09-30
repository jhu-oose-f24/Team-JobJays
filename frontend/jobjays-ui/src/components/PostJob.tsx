// src/components/PostJob.tsx
import styles from '@/styles/postJob.module.css'; // Assuming you style it with CSS Modules


const PostJob = () => {
    return (
        <div className={styles.postJobContainer}>
            <h2>Post a Job</h2>

            <form className={styles.postJobForm}>
                {/* Job Title */}
                <label className={styles.formLabel} htmlFor="jobTitle">Job Title</label>
                <input
                    type="text"
                    id="jobTitle"
                    placeholder="Add job title, role, vacancies etc."
                    className={styles.formInput}
                />

                {/* Job Description */}
                <label className={styles.formLabel} htmlFor="jobDescription">Job Description</label>
                <textarea
                    id="jobDescription"
                    placeholder="Add Job Description, Responsibilities, etc."
                    className={styles.textAreaInput} // Using a different class for text area
                    rows={6} // You can adjust rows for height
                />

                {/* Job Role */}
                <label className={styles.formLabel} htmlFor="jobRole">Job Role</label>
                <select id="jobRole" className={styles.formSelect}>
                    <option>Select...</option>
                    {/* Add more options as needed */}
                </select>

                {/* Salary Inputs */}
                <label className={styles.formLabel}>Salary</label>
                <div className={styles.salaryInputs}>
                    <input type="text" placeholder="Min Salary" className={styles.formInput} />
                    <input type="text" placeholder="Max Salary" className={styles.formInput} />
                    <select className={styles.formSelect}>
                        <option>USD</option>
                        {/* Add more currency options */}
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.postJobButton}>
                    Post Job
                </button>
            </form>
        </div>
    );
};
export default PostJob;
