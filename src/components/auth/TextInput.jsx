import React from "react";

export default function TextInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold text-gray-700 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

