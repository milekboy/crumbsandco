"use client";
import Header from "@layouts/headers/Index";
import Footer from "@layouts/footers/Index";
import LoadingOverlay from "../_components/LoadingOverlay";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PagesLayouts = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const asPath = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [asPath]);

  return (
    <>
      {loading && <LoadingOverlay />}
      <Header layout={"default"} setLoading={setLoading} />
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {children}
        <Footer layout={"default"} />
      </div>
    </>
  );
};

export default PagesLayouts;
