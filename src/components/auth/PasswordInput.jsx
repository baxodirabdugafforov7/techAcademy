import React, { useState, useEffect } from "react";

export default function PasswordInput({
  name = "password",
  value,
  onChange,
  placeholder = "Enter Password",
  required = true,
}) {
  const [rules, setRules] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    special: false,
  });

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const checkPassword = (password) => {
      setRules({
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        digit: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    };

    checkPassword(value);
  }, [value]);

  const getRuleClass = (isValid) =>
    isValid ? "hidden" : "text-red-500";

  const handleChange = (e) => {
    onChange(e);
    if (!touched) setTouched(true);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-lg font-semibold text-gray-700 mb-1"
      >
        Password
      </label>
      <input
        id={name}
        name={name}
        type="password"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 px-4 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-400"
      />


      {touched && (
        <ul className="text-xs mt-2 space-y-1">
          {!rules.length && (
            <li className={getRuleClass(false)}>• At least 8 characters</li>
          )}
          {!rules.lowercase && (
            <li className={getRuleClass(false)}>• At least one lowercase letter</li>
          )}
          {!rules.uppercase && (
            <li className={getRuleClass(false)}>• At least one uppercase letter</li>
          )}
          {!rules.digit && (
            <li className={getRuleClass(false)}>• At least one digit</li>
          )}
          {!rules.special && (
            <li className={getRuleClass(false)}>• At least one special character</li>
          )}
        </ul>
      )}
    </div>
  );
}
