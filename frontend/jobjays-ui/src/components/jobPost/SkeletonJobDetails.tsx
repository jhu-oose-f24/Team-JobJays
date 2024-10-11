import { Skeleton} from "@/components/ui/skeleton";

const SkeletonJobDetails = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between">
                    <div>
                        <Skeleton className="w-[200px] h-[30px] rounded-full"/> {/* Job title skeleton */}
                        <Skeleton className="w-[150px] h-[20px] mt-2 rounded-full"/> {/* Company name skeleton */}
                        <div className="flex space-x-2 mt-2">
                            <Skeleton className="w-[80px] h-[20px] rounded-full"/> {/* Job type skeleton */}
                            <Skeleton className="w-[100px] h-[20px] rounded-full"/> {/* Featured badge skeleton */}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Skeleton className="w-[100px] h-[40px] rounded-md"/> {/* Apply button skeleton */}
                        <Skeleton className="w-[120px] h-[40px] rounded-md"/> {/* Edit button skeleton */}
                    </div>
                </div>

                <div className="mt-6">
                    <Skeleton className="w-[150px] h-[25px] rounded-full"/> {/* Job description title skeleton */}
                    <Skeleton className="w-full h-[80px] mt-2 rounded-md"/> {/* Job description skeleton */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Salary and Job Overview */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <Skeleton className="w-[150px] h-[25px] rounded-full"/> {/* Salary heading skeleton */}
                    <Skeleton className="w-[120px] h-[30px] mt-2 rounded-full"/> {/* Salary skeleton */}
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <Skeleton className="w-[150px] h-[25px] rounded-full"/> {/* Job overview heading skeleton */}
                    <Skeleton className="w-full h-[60px] mt-2 rounded-md"/> {/* Job overview content skeleton */}
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <Skeleton className="w-[150px] h-[25px] rounded-full"/> {/* Share job heading skeleton */}
                    <Skeleton className="w-full h-[40px] mt-2 rounded-md"/> {/* Share buttons skeleton */}
                </div>
            </div>
        </div>
    );
}
export default SkeletonJobDetails;

