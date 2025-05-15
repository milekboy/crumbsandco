"use client";
import LoadingOverlay from "../../_components/LoadingOverlay";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AdminHeader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  function navHandler() {
    setLoading(true);
  }

  return (
    <div>
      {loading && <LoadingOverlay />}
      <div className="flex flex-col">
        <div className="px-8 pt-4 border-b flex justify-between">
          <div>
            <p className="text-xl text-[#f1c126] font-semibold">
              Welcome Back!
            </p>
            <p className="text-sm text-gray-500">Set up a new goal today!</p>
          </div>

          <Link href="/">
            <div onClick={navHandler}>
              <button className="text-white bg-[#f1c126] rounded-lg px-4 py-1.5 hover:bg-[#f6ebc7] transition cursor-pointer">
                Back to Home
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
