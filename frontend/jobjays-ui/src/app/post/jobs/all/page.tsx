import ListJob from "@/components/jobPost/ListJob";
import Navbar from '@/components/Navbar';
import HeaderActions from "@/components/HeaderActions";
import AboutUs from "@/components/AboutUs";

    const ListJobPage = () => {
        return (
        <>
            <Navbar />
            <HeaderActions />
            <div>
                <h1>List a Job</h1>
                <ListJob />
                
            </div>
            <AboutUs />
            {/*<HeroSection />*/}
            {/*<JobStats />*/}
            {/*<PopularCategories />*/}
            {/*<FeaturedJobs />*/}
            {/*<Testimonials />*/}
            {/*<Footer />*/}
        </>
        );
    };
    
    export default ListJobPage;

