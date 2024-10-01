import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import HowItWorks from "@/components/ui/Instructions";
import Statistics from "@/components/ui/Statistics";
import Image from "next/image";

import Navbar from '@/components/Navbar';
import HeaderActions from "@/components/HeaderActions";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Statistics />
      <HowItWorks />
    </>

  );
}

