import { Skeleton} from "@/components/ui/skeleton";
import styles from '@/styles/my-jobs.module.css';

const SkeletonMyJobs = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {/* Skeleton for the header */}
                <div className={styles.header}>
                    <Skeleton className="w-[150px] h-[30px] rounded-full"/> {/* My Jobs title */}
                    <Skeleton className="w-[50px] h-[30px] rounded-full"/> {/* Job count */}
                    <div className={styles.filter}>
                        <Skeleton className="w-[100px] h-[20px] rounded-full"/> {/* Job status label */}
                        <Skeleton className="w-[120px] h-[30px] rounded-md"/> {/* Job status dropdown */}
                    </div>
                </div>

                {/* Skeleton for the Job List */}
                <div className={styles.jobList}>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className={styles.jobRow}>
                            <div className={styles.jobDetails}>
                                <Skeleton className="w-[200px] h-[25px] rounded-full"/> {/* Job title */}
                                <Skeleton
                                    className="w-[150px] h-[20px] mt-2 rounded-full"/> {/* Job type and days remaining */}
                            </div>
                            <div className={styles.jobStatus}>
                                <Skeleton className="w-[80px] h-[20px] rounded-full"/> {/* Job status */}
                                <Skeleton
                                    className="w-[100px] h-[20px] mt-2 rounded-full"/> {/* Number of applications */}
                            </div>
                            <div className={styles.jobActions}>
                                <Skeleton className="w-[120px] h-[40px] rounded-md"/> {/* View Applications button */}
                                <Skeleton className="w-[40px] h-[40px] rounded-full"/> {/* More actions button */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skeleton for Pagination */}
                <div className={styles.pagination}>
                    <Skeleton className="w-[30px] h-[30px] rounded-full"/> {/* Pagination button */}
                    <Skeleton className="w-[30px] h-[30px] rounded-full"/>
                    <Skeleton className="w-[30px] h-[30px] rounded-full"/>
                    <Skeleton className="w-[30px] h-[30px] rounded-full"/>
                    <Skeleton className="w-[30px] h-[30px] rounded-full"/>
                    <Skeleton className="w-[30px] h-[30px] rounded-full"/>
                    <Skeleton className="w-[30px] h-[30px] rounded-full"/>
                </div>
            </main>
        </div>
    );
}
export default SkeletonMyJobs;

