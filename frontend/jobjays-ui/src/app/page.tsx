'use client';
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import HowItWorks from "@/components/ui/Instructions";
import Statistics from "@/components/ui/Statistics";
import AboutUs from "@/components/AboutUs";
import Support from "@/components/Support";
import ContactUs from "@/components/ContactUs";
import React, {useEffect} from "react";
import {TimeSpentOnPage} from "@/lib/types";
import {usePathname} from "next/navigation";

export default function Home() {
    const trackingId = React.useMemo(() => crypto.randomUUID(), []); // consistent tracking ID
    const userAgent = navigator.userAgent;
    // const page = window.location.pathname;
    // const [startTime, setStartTime] = React.useState<number | null>(null);
    // const pathname = usePathname();
    //
    //
    // const logTimeSpentOnPage = () => {
    //     if (startTime) {
    //         const timeSpent = Date.now() - startTime;
    //         console.log(`Time spent on ${page}: ${timeSpent} ms`);
    //         // Send timeSpent to server or analytics service here, if needed
    //     }
    // };
    //
    // useEffect(() => {
    //     // Start tracking with a 2-second delay when the component mounts
    //     console.log(`Component mounted, current pathname: ${pathname}`);
    //     setStartTime(Date.now());
    //
    //
    //     return () => {
    //
    //         logTimeSpentOnPage();
    //         console.log('Logging time spent...');
    //         setStartTime(null); // Reset start time on unmount
    //
    //     };
    // }, [pathname, page]);

    // const trackTimeSpentOnPage = () => {
    //     // const trackingId = crypto.randomUUID();
    //     // const agent = navigator.userAgent;
    //     // const page = window.location.pathname;
    //     //const startTime = Date.now();
    //
    //     // window.addEventListener('beforeunload', () => {
    //     //     const timeSpent = Date.now() - startTime;
    //     //     console.log(`Time spent on page: ${timeSpent} ms`);
    //     // });
    //     setStartTime(Date.now());
    //
    //
    //
    // }
    //
    //
    // // Call the tracking function when the component mounts
    // useEffect(() => {
    //     setTimeout(trackTimeSpentOnPage, 2000);
    //
    // }, []);
    //
    // useEffect(() => {
    //     const endTime = Date.now();
    //     const timeSpent = endTime - (startTime || endTime);
    //     console.log(`Time spent on page: ${timeSpent} ms`);
    //     // Here you can send the timeSpent data to your server or analytics service
    //
    // },[page]) //if page changes, create record and log data

    return (
    <>
      <Header />
      <Hero />
      <Statistics />
      <HowItWorks />
      <AboutUs />
      <Support />
      <ContactUs />
    </>

  );
}

