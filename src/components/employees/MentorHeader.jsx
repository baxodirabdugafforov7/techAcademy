import React from "react";
import { Link } from "react-router-dom";

const MentorHeader = () => {
  const handleExport = () => {
    const mentors = JSON.parse(localStorage.getItem("mentors")) || [];

    if (!mentors.length) {
      alert("No mentor data to export.");
      return;
    }

    const headers = Object.keys(mentors[0]);
    const csvRows = [
      headers.join(","),
      ...mentors.map((m) => headers.map((h) => `"${m[h] || ""}"`).join(",")),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mentors.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Mentors</h2>
        <p className="text-sm text-gray-500">View and manage group details</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="px-4 py-2 border border-red-600 text-red-600 bg-white rounded hover:bg-red-600 hover:text-white text-sm transition"
        >
          Export
        </button>
        <Link to="/employees/add">
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 text-sm transition">
            + Add Mentor
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MentorHeader;
