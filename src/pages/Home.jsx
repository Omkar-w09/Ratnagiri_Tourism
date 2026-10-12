import React from "react";


import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import PopularPlaces from "../components/PopularPlaces";
import HiddenGems from "../components/HiddenGems";
import FoodSection from "../components/FoodSection";
import RentalsSection from "../components/RentalsSection";
import GuidesSection from "../components/GuidesSection";
import EmergencySection from "../components/EmergencySection";
import TravelTips from "../components/TravelTips";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
   

      <Hero />

      <CategorySection />

      <PopularPlaces />

      <HiddenGems />

      <FoodSection />

      <RentalsSection />

      <GuidesSection />

      <EmergencySection />

      <TravelTips />

      <Testimonials />

      <Footer />
    </div>
  );
}

export default Home;