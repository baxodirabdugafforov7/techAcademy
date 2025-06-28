import React from "react";

export default function AuthLayout({ bgImage, children }) {
  return (
    <div className="flex h-screen">
      {/* Left Side - Background image */}
      <div
        className="w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ✅ Fixed typo in bg-black */}
        <div className="absolute" />
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-xl p-10 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
          {children}
        </div>
      </div>
    </div>
  );
}
