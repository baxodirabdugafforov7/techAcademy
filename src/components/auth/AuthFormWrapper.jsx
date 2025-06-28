import React from "react";

export default function AuthFormWrapper({ title, children }) {
  return (
    <div>
      {/* Title aligned left and larger */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-left">{title}</h2>
       <div>{children}</div>
    </div>
  );
}
