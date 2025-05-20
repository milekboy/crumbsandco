"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Link from "next/link";
import NetworkInstance from "../../api/NetworkInstance";
import { useState } from "react";
import LoadingOverlay from "../../_components/LoadingOverlay";
import Toast from "../../_components/Toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const router = useRouter();
  const networkInstance = NetworkInstance();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      isAdmin: true,
      isClient: false,
    };

    try {
      const response = await networkInstance.post(`/user/register`, payload);

      if (response.status === 201 || response.status === 200) {
        console.log(response.data);
        setToast({ message: "Registration successful!", type: "success" });
        localStorage.setItem("email", response.data.userData.email);
        console.log(payload);
        setLoading(true);
        setTimeout(() => {
          setToast(null);
          router.push("/otp-page");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      console.log(payload);
      setToast({
        message: error?.response?.data?.message || "Registration failed",
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

      <div id="sb-dynamic-content" className="sb-transition-fade mt-28">
        <section className="sb-banner">
          <div className="sb-bg-1">
            <div></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="sb-main-title-frame">
                  <div className="sb-main-title">
                    <h1 className="sb-mb-30">
                      Create an <br /> Account
                    </h1>
                    <Link href="/" className="sb-btn sb-btn-2">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                      </span>
                      <span>Back to homepage</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="flex justify-center w-full">
                  <div className="flex justify-center lg:items-center h-screen mt-5 lg:mt-0">
                    <form
                      onSubmit={handleSubmit}
                      className="w-full max-w-2xl mx-auto"
                    >
                      <h2 className="text-2xl font-semibold mb-4">
                        Register New Account
                      </h2>

                      {/* Row 1: First Name & Last Name */}
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                          <label className="block font-medium mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full h-12 p-2 border rounded-lg"
                            placeholder="Enter First Name"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block font-medium mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full h-12 p-2 border rounded-lg"
                            placeholder="Enter Last Name"
                          />
                        </div>
                      </div>

                      {/* Row 2: Email & Phone Number */}
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                          <label className="block font-medium mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-12 p-2 border rounded-lg"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block font-medium mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full h-12 p-2 border rounded-lg"
                            placeholder="Enter Phone Number"
                          />
                        </div>
                      </div>

                      {/* Row 3: Gender & Password */}
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                          <label className="block font-medium mb-1">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full h-12 p-2 border rounded-lg"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="w-1/2 relative">
                          <label className="block font-medium mb-1">
                            Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full h-12 p-2 border rounded-lg pr-10"
                            placeholder="Enter Password"
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </span>
                        </div>
                      </div>

                      {/* Row 4: Confirm Password */}
                      <div className="flex gap-4 mb-4">
                        <div className="lg:w-1/2 relative">
                          <label className="block font-medium mb-1">
                            Confirm Password
                          </label>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full h-12 p-2 border rounded-lg pr-10"
                            placeholder="Confirm Password"
                          />
                          <span
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                          >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          </span>
                        </div>
                        <div className="w-1/2" />
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-4 p-2 h-12 bg-[#F1C126] cursor-pointer text-white rounded-lg hover:bg-[#ecdaa0]"
                      >
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
