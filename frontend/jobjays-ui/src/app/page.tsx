import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import HowItWorks from "@/components/ui/Instructions";
import Statistics from "@/components/ui/Statistics";
import AboutUs from "@/components/AboutUs";
import Support from "@/components/Support";
import ContactUs from "@/components/ContactUs";

export default function Home() {
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

