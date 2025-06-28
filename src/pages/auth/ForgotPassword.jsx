import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import TextInput from "@/components/auth/TextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import forgotBg from "@/assets/images/signUp_img.png";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (!user) return setError("No user found with this email.");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    setInfo("Use the code below to verify your identity.");
    setStep("otp");
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (enteredOTP !== generatedOTP) return setError("Invalid OTP.");
    setStep("reset");
    setError("");
    setInfo("OTP verified. You can now reset your password.");
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("currentUser");
    setInfo("✅ Password updated successfully.");
    navigate("/login");
  };

  return (
    <AuthLayout bgImage={forgotBg}>
      <AuthFormWrapper title="Forgot Password">
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <TextInput
              label="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-1/2 border border-gray-400 text-gray-800 py-2 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-green-800 text-white py-2 rounded hover:bg-green-700"
              >
                Generate Code
              </button>
            </div>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div className="bg-gray-100 border border-dashed border-green-500 text-green-700 text-center p-4 rounded-md">
              <p className="text-sm font-semibold mb-1">Your OTP Code</p>
              <p className="text-xl font-bold tracking-widest">{generatedOTP}</p>
            </div>

            <TextInput
              label="Enter the code"
              type="text"
              maxLength={6}
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {info && <p className="text-green-700 text-sm">{info}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setError("");
                }}
                className="w-1/2 border border-gray-400 text-gray-800 py-2 rounded hover:bg-gray-200"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="w-1/2 bg-green-800 text-white py-2 rounded hover:bg-green-700"
              >
                Verify Code
              </button>
            </div>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {info && <p className="text-green-700 text-sm">{info}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("otp");
                  setError("");
                }}
                className="w-1/2 border border-gray-400 text-gray-800 py-2 rounded hover:bg-gray-200"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="w-1/2 bg-green-800 text-white py-2 rounded hover:bg-green-700"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </AuthFormWrapper>
    </AuthLayout>
  );
}
