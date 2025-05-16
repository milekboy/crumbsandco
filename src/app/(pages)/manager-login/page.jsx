"use client";

import Link from "next/link";
import NetworkInstance from "../../api/NetworkInstance";
import { useState } from "react";
import LoadingOverlay from "../../_components/LoadingOverlay";
import Toast from "../../_components/Toast";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [toast, setToast] = useState(null);

  const networkInstance = NetworkInstance();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToast({
        message: "email and password are required",
        type: "warning",
      });
      return;
    }

    try {
      const response = await networkInstance.post(`/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setToast({ message: "Login successful!", type: "success" });
        setLoading(true);

        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          setToast(null);
          router.push("/admin-home");
        }, 1500);
      }
    } catch (error) {
      setToast({
        message: "Invalid credentials. Please try again.",
        type: "error",
      });
    }
  };
  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {loading && <LoadingOverlay />}

      {/* dynamic content */}
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {/* banner */}
        <section className="sb-banner">
          <div className="sb-bg-1">
            <div></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {/* main title */}
                <div className="sb-main-title-frame">
                  <div className="sb-main-title">
                    {/* <span className="sb-404">Login</span> */}
                    <h1 className="sb-mb-30">
                      Login To Your <br />
                      Admin Account
                    </h1>
                    {/* button */}
                    <Link href="/" className="sb-btn sb-btn-2">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                      </span>
                      <span>Back to homepage</span>
                    </Link>
                    {/* button end */}
                  </div>
                </div>
                {/* main title end */}
              </div>
              <div className="col-lg-6">
                <div className="flex justify-center w-full">
                  <div className="flex justify-center lg:items-center h-screen mt-5 lg:mt-0">
                    <form onSubmit={handleSubmit} className="w-96 lg:ps-10">
                      <h2 className="text-2xl font-semibold mb-4">
                        Welcome 👋
                      </h2>
                      <p className="text-gray-500 mb-6">Please login here</p>

                      <label className="block mb-2 font-medium">Email</label>
                      <input
                        type="email"
                        className="w-full h-12 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Input Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <label className="block mt-4 mb-2 font-medium">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full h-12 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <div className="flex items-center mt-4">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          className="mr-2 accent-transparent cursor-pointer"
                        />
                        <label>Remember Me</label>
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-4 p-2 h-12 bg-[#F1C126] cursor-pointer text-white rounded-lg hover:bg-[#ecdaa0]"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner end */}
      </div>
      {/* dynamic content end */}
    </>
  );
};
export default AdminLogin;
