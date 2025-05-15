"use client";
import Header from "@layouts/headers/Index";
import Footer from "@layouts/footers/Index";
import LoadingOverlay from "../_components/LoadingOverlay";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PagesLayouts = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {loading && <LoadingOverlay />}
      {!isAdminPage && <Header layout="default" setLoading={setLoading} />}
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {children}
        {!isAdminPage && <Footer layout="default" />}
      </div>
    </>
  );
};

export default PagesLayouts;
