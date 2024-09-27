// src/app/homepage/page.tsx

import Navbar from '@/components/Navbar';
import HeaderActions from "@/components/HeaderActions";
import AboutUs from "@/components/AboutUs";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <HeaderActions />
            <AboutUs />
            {/*<HeroSection />*/}
            {/*<JobStats />*/}
            {/*<PopularCategories />*/}
            {/*<FeaturedJobs />*/}
            {/*<Testimonials />*/}
            {/*<Footer />*/}
        </>
    );
}
