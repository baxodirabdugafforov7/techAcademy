import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt, FaUsers, FaLayerGroup, FaUserTie,
  FaMoneyBillWave, FaKey, FaCog, FaHeadset,
  FaSignOutAlt, FaBars, FaChevronLeft
} from "react-icons/fa";
import logo from "@/assets/icons/tech_logo.png";

const menus = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Students", icon: <FaUsers />, path: "/students" },
  { name: "Groups", icon: <FaLayerGroup />, path: "/groups" },
  { name: "Employees", icon: <FaUserTie />, path: "/employees" },
  { name: "Finance", icon: <FaMoneyBillWave />, path: "/finance" },
  { name: "Permissions", icon: <FaKey />, path: "/permissions" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
  { name: "Support", icon: <FaHeadset />, path: "/support" },
  { name: "Logout", icon: <FaSignOutAlt />, path: "/login" },
];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      <aside
        className={`transition-all duration-300 ease-in-out bg-white shadow-lg p-6 space-y-6 overflow-y-auto
        ${collapsed ? "w-[110px]" : "w-[360px]"}`}
      >
        <div className="flex justify-between items-center mb-6 h-[72px]">
          <div className={`transition-opacity duration-300 ${collapsed ? "opacity-0" : "opacity-100"} w-full`}>
            <img src={logo} alt="Logo" className="w-full max-w-[180px]" />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-green-700 text-2xl p-5 hover:bg-gray-100 rounded transition"
          >
            {collapsed ? <FaBars /> : <FaChevronLeft />}
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {menus.map(({ name, icon, path }) => (
            <NavLink
              to={path}
              key={name}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-4 rounded-lg text-lg font-semibold transition-all 
                hover:bg-green-700 hover:text-white 
                ${isActive ? "bg-green-900 text-white" : "text-green-800"}`
              }
            >
              <span className="text-2xl">{icon}</span>
              {!collapsed && <span className="whitespace-nowrap">{name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-100 p-8 transition-all duration-300 text-[17px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
