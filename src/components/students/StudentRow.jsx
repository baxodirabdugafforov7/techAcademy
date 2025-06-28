import React from "react";
import { useNavigate } from "react-router-dom";

const StudentRow = ({ student }) => {
  const navigate = useNavigate();
  const {
    id,
    fullName = "No name",
    phone = "N/A",
    course = "Unknown",
    enrolled = "N/A",
    price = 0,
    status = "unknown",
    img = "",
  } = student;

  const handleAction = (e) => {
    const action = e.target.value;
    if (action === "view") navigate(`/students/${id}`);
    else if (action === "edit") navigate(`/students/${id}/edit`);
    else if (action === "delete") {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const updated = students.filter((s) => s.id !== id);
      localStorage.setItem("students", JSON.stringify(updated));
      window.location.reload();
    }
    e.target.selectedIndex = 0;
  };

  return (
    <tr className=" hover:bg-gray-50 transition text-base whitespace-nowrap">
      <td className="px-6 py-4 flex items-center gap-4">
        <img
          src={img || "/default-avatar.png"}
          alt={fullName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800 text-[15px]">{fullName}</p>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-[15px]">{course}</td>
      <td className="px-6 py-4 text-[15px]">{enrolled}</td>
      <td className="px-6 py-4 text-[15px] font-medium">${price}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1.5 rounded text-sm font-semibold border ${
            status === "active"
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <select
          onChange={handleAction}
          defaultValue=""
          className="border border-red-600 text-red-600 bg-white rounded px-3 py-2 text-sm font-medium hover:bg-red-600 hover:text-white transition"
        >
          <option value="" disabled>
            Actions
          </option>
          <option value="view">View</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => navigate(`/students/${id}/edit`)}
          className="bg-red-600 text-white text-sm px-4 py-2 rounded font-medium hover:bg-red-500 transition"
        >
          Go
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
