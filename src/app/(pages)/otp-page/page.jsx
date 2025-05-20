"use client";
import { useRouter } from "next/navigation";
import Toast from "../../_components/Toast";
import { useState, useRef } from "react";
import NetworkInstance from "../../api/NetworkInstance";
import LoadingOverlay from "../../_components/LoadingOverlay";
export default function Otp() {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const networkInstance = NetworkInstance();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const router = useRouter();
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };
  const handleOtpSubmit = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.log("No email found.");
      return;
    }
    const payload = {
      email: email,
      otp: otp.join(""),
    };
    try {
      const response = await networkInstance.post(`/user/verify-otp`, payload);

      if (response.status === 200) {
        setToast({ message: "Verification successful!", type: "success" });
        setLoading(true);

        setTimeout(() => {
          setToast(null);
          router.push("/registration-successful");
        }, 1500);
      }
    } catch (error) {
      console.log(payload);
      console.log(error);
      setToast({
        message: `${error?.response?.data.message}`,
        type: "error",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {loading && <LoadingOverlay />}
      <div className="w-full max-w-md text-center space-y-8">
        <p className="text-4xl font-bold ">OTP Verification</p>
        <p className="text-lg text-gray-600 mb-8">
          A code has been sent to your email
        </p>

        <div className="flex justify-center gap-3 lg:gap-4 ">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-14 lg:w-16 h-16 border rounded bg-transparent outline-none text-center font-semibold text-xl border-[#FFC107] focus:shadow-md text-gray-700 transition"
            />
          ))}
        </div>

        <button
          onClick={handleOtpSubmit}
          className="w-full  p-3 bg-[#F1C126] text-white rounded-lg hover:bg-[#ecdaa0]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
