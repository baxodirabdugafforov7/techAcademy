import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton({ label = "Sign in with Google", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition mb-4"
    >
      <FcGoogle className="text-xl" />
      {label}
    </button>
  );
}
