import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MentorRow = ({ mentor, refreshMentors }) => {
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/employees/edit/${mentor.id}`);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${mentor.fullName}?`)) {
      const stored = JSON.parse(localStorage.getItem("mentors")) || [];
      const updated = stored.filter((m) => m.id !== mentor.id);
      localStorage.setItem("mentors", JSON.stringify(updated));
      refreshMentors?.();
    }
  };

  const handleActionChange = (value) => {
    setAction("");
    if (value === "edit") handleEdit();
    else if (value === "delete") handleDelete();
  };

  const {
    fullName = "No Name",
    courses = "-",
    dateJoined = "-",
    groups = "-",
    status = "Unknown",
  } = mentor;

  return (
    <tr className=" hover:bg-gray-50 transition text-base whitespace-nowrap">
      <td className="px-6 py-4 font-semibold text-gray-800 text-[15px]">{fullName}</td>
      <td className="px-6 py-4 text-[15px]">{courses}</td>
      <td className="px-6 py-4 text-[15px]">{dateJoined}</td>
      <td className="px-6 py-4 text-[15px]">{groups}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1.5 rounded text-sm font-semibold border ${
            status === "Active"
              ? "bg-green-100 text-green-700 border-green-300"
              : status === "Inactive"
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-gray-100 text-gray-600 border-gray-300"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <select
          value={action}
          onChange={(e) => handleActionChange(e.target.value)}
          className="border border-red-600 text-red-600 bg-white rounded px-3 py-2 text-sm font-medium hover:bg-red-600 hover:text-white transition"
        >
          <option value="">Actions</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={handleEdit}
          className="bg-red-600 text-white text-sm px-4 py-2 rounded font-medium hover:bg-red-500 transition"
        >
          Go
        </button>
      </td>
    </tr>
  );
};

export default MentorRow;
