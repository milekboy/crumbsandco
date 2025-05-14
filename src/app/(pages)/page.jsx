"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import LoadingOverlay from "../_components/LoadingOverlay";
import AppData from "@data/app.json";
import Products from "@data/products";

import HeroSection from "@components/sections/Hero";
import AboutSection from "@components/sections/About";
import CategoriesSection from "@components/sections/Categories";
import TeamSection from "@components/sections/Team";
import CallToActionSection from "@components/sections/CallToAction";

const ProductsSlider = dynamic(() => import("@components/sliders/Products"), {
  ssr: false,
});

// export const metadata = {
//   title: {
//     default: "Home",
//     template: "%s | " + AppData.settings.siteName,
//   },
//   description: AppData.settings.siteDescription,
// };

function Home1() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <LoadingOverlay />}
      <HeroSection type={1} />
      <AboutSection />
      <CategoriesSection />
      <ProductsSlider
        items={Products.collection["popular"]}
        slidesPerView={4}
        setLoading={setLoading}
      />
      <TeamSection />
      {/* <CallToActionSection /> */}
    </>
  );
}
export default Home1;
