"use client";
import LoadingOverlay from "../../_components/LoadingOverlay";
import { useState } from "react";
import AppData from "@data/app.json";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Sidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  function navHandler() {
    setLoading(true);
  }

  return (
    <div className="w-64   text-gray-800 px-5 py-4 border-r-2 border-gray-100">
      {loading && <LoadingOverlay />}
      <Link href="/" className="sb-logo-frame">
        {/* logo img */}
        <img src={AppData.header.logo.image} alt={AppData.header.logo.alt} />
      </Link>
      <div className="  space-y-5 mt-5">
        <Link href={"/admin-home"}>
          <button
            onClick={navHandler}
            className={
              pathname == "/admin-home"
                ? `py-2 w-40 text-center cursor-pointer text-white px-3 rounded bg-[#f1c126]`
                : `py-2 w-40   text-center cursor-pointer text-[#f1c126] px-3 rounded hover:bg-[#f1c126] hover:text-white`
            }
          >
            Products
          </button>
        </Link>
        <Link href={"/admin-upload"}>
          <button
            onClick={navHandler}
            className={
              pathname == "/admin-upload"
                ? `mt-2 py-2 w-40 text-center cursor-pointer text-white px-3 rounded bg-[#f1c126]`
                : ` mt-2 py-2 w-40 text-center cursor-pointer text-[#f1c126] px-3 rounded hover:bg-[#f1c126] hover:text-white`
            }
          >
            Upload Products
          </button>
        </Link>
        <Link href={"/admin-orders"}>
          <button
            onClick={navHandler}
            className={
              pathname.startsWith("/edit-product")
                ? `mt-2 py-2 w-40 text-center cursor-pointer text-white px-3 rounded bg-[#f1c126]`
                : `mt-2 py-2 w-40 text-center cursor-pointer text-[#f1c126] px-3 rounded hover:bg-[#f1c126] hover:text-white`
            }
          >
            Orders
          </button>
        </Link>
      </div>
    </div>
  );
}
