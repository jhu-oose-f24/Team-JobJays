import Sidebar from "@/components/ui/Sidebar";
import NavBar from "@/components/ui/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            {/* NavBar at the top, full width */}
            <div className="w-full">
                <NavBar />
            </div>

            {/* Flex container for Sidebar and main content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar on the left */}
                <div className="w-full flex-none md:w-64 bg-white">
                    <Sidebar />
                </div>

                {/* Main content area */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
