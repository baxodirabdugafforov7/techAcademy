import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaGlobe, FaUserCircle } from "react-icons/fa";

const TopBar = ({ lang, setLang }) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const langRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const mockNotifications = [
    "New mentor added",
    "3 students assigned to Group A",
    "Course updated: React Basics",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langRef.current &&
        !langRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowLangDropdown(false);
        setShowNotificationDropdown(false);
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm mb-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-red-300 rounded px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />

      {/* Right Controls */}
      <div className="flex items-center space-x-6 relative">
        {/* Notification Bell */}
        <div ref={notificationRef} className="relative">
          <FaBell
            className="text-red-600 text-xl cursor-pointer hover:text-red-500 transition"
            title="Notifications"
            onClick={() => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setShowLangDropdown(false);
              setShowProfileDropdown(false);
            }}
          />
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-red-200 rounded shadow z-50">
              <div className="p-3 border-b font-semibold text-gray-700">Notifications</div>
              <ul className="max-h-48 overflow-y-auto">
                {mockNotifications.map((note, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm hover:bg-red-50 cursor-pointer"
                  >
                    {note}
                  </li>
                ))}
              </ul>
              <div className="text-center text-sm text-red-600 py-2 border-t hover:underline cursor-pointer">
                View all
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => {
              setShowLangDropdown(!showLangDropdown);
              setShowProfileDropdown(false);
              setShowNotificationDropdown(false);
            }}
            className="flex items-center space-x-1 text-red-600 hover:text-red-500 transition"
          >
            <FaGlobe className="text-xl" />
            <span className="text-sm">{lang}</span>
          </button>

          {showLangDropdown && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-red-200 rounded shadow z-50">
              {["English", "Uzbek", "Russian"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setLang(option);
                    setShowLangDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-red-50 ${
                    lang === option ? "bg-red-50 font-medium" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div ref={profileRef} className="relative">
          <FaUserCircle
            className="text-red-600 text-2xl cursor-pointer hover:text-red-500 transition"
            title="Profile"
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowLangDropdown(false);
              setShowNotificationDropdown(false);
            }}
          />
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-red-200 rounded shadow z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-red-50">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
