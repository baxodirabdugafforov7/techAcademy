import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

import SignUp from "@/pages/auth/SignUp";
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";


import AdminDashboard from "@/pages/AdminDashboard";


import DashboardPage from "@/pages/Dashboard";
import Students from "@/pages/students/Students";
import Groups from "@/pages/Groups";
import AddGroup from "@/pages/groups/AddGroup";
import Employees from "@/pages/employees/Employees";
import Finance from "@/pages/Finance";
import Permissions from "@/pages/Permissions";
import Settings from "@/pages/Settings";
import Support from "@/pages/Support";
import Logout from "@/pages/Logout";
import AddMentor from "@/pages/employees/AddMentor";
import EditMentor from "@/pages/employees/EditMentor";
import AddStudent from "@/pages/students/AddStudent";
import EditStudent from "@/pages/students/EditStudent";
import EditGroup from "@/pages/groups/EditGroup";

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route path="/" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/:id/edit" element={<EditStudent />} />

          <Route path="groups/add" element={<AddGroup />} />
          <Route path="groups/:groupId/edit" element={<EditGroup />} />
          <Route path="groups" element={<Groups />} />

          <Route path="employees" element={<Employees />} />
          <Route path="employees/add" element={<AddMentor />} />
          <Route path="employees/edit/:id" element={<EditMentor />} />

          <Route path="finance" element={<Finance />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="logout" element={<Logout />} />
        </Route>



        <Route path="*" element={<h1 className="text-center mt-20 text-2xl">404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}
