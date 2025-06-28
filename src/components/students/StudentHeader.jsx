import React from "react";
import { useNavigate } from "react-router-dom";

const StudentHeader = () => {
  const navigate = useNavigate();

  const handleExport = () => {
    const students = JSON.parse(localStorage.getItem("students") || "[]");

    if (students.length === 0) {
      alert("No student data to export.");
      return;
    }

    const headers = Object.keys(students[0]);
    const csvRows = [
      headers.join(","),
      ...students.map((s) => headers.map((h) => `"${s[h] || ""}"`).join(",")),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "students_export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <p className="text-sm text-gray-500">
          Manage all enrolled students and their data
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="px-4 py-2 border border-red-600 text-red-600 bg-white rounded hover:bg-red-600 hover:text-white text-sm transition"
        >
          Export
        </button>
        <button
          onClick={() => navigate("/students/add")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 text-sm transition"
        >
          + Add Student
        </button>
      </div>
    </div>
  );
};

export default StudentHeader;
