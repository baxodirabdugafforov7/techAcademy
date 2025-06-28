import React from "react";
import { useNavigate } from "react-router-dom";

const GroupRow = ({ group, mentors, students, courses }) => {
  const navigate = useNavigate();
  const {
    id,
    name = "No name",
    course = "Unknown",
    mentorId = "",
    studentIds = [],
    time = "-",
    days,
    price = 0,
    classroom = "-",
    startDate = "",
    status = "unknown",
  } = group;

  const mentor = mentors.find((m) => m.id === mentorId);
  const mentorName = mentor?.fullName || "Unassigned";
  const memberCount = Array.isArray(studentIds) ? studentIds.length : 0;

  const parsedDays = Array.isArray(days)
    ? days
    : typeof days === "string"
    ? days.split(",").map((d) => d.trim())
    : [];

  const formattedDays = parsedDays.length > 0 ? parsedDays.join(", ") : "-";
  const formattedStart = startDate ? new Date(startDate).toLocaleDateString() : "-";

  const handleAction = (e) => {
    const action = e.target.value;
    if (action === "edit") navigate(`/groups/${id}/edit`);
    else if (action === "delete") {
      const groups = JSON.parse(localStorage.getItem("groups")) || [];
      const updated = groups.filter((g) => g.id !== id);
      localStorage.setItem("groups", JSON.stringify(updated));
      window.location.reload();
    }
    e.target.selectedIndex = 0;
  };

  return (
    <tr className=" hover:bg-gray-50 transition text-[15px] whitespace-nowrap">
      <td className="px-6 py-5 font-semibold w-[260px] text-gray-800">{name}</td>
      <td className="px-6 py-5 w-[240px] text-gray-700">{course}</td>
      <td className="px-6 py-5 w-[200px] text-gray-700">{mentorName}</td>
      <td className="px-6 py-5 w-[200px] text-gray-600">{formattedDays}</td>
      <td className="px-6 py-5 w-[140px] text-gray-600">{time}</td>
      <td className="px-6 py-5 hidden md:table-cell text-gray-600">${price}</td>
      <td className="px-6 py-5 hidden md:table-cell text-gray-600">{classroom}</td>
      <td className="px-6 py-5 hidden md:table-cell text-gray-600">{memberCount}</td>
      <td className="px-6 py-5 hidden md:table-cell text-gray-600">{formattedStart}</td>
      <td className="px-6 py-5 hidden md:table-cell">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
            status === "active"
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-5 hidden md:table-cell">
        <select
          onChange={handleAction}
          defaultValue=""
          className="border border-red-600 text-red-600 rounded-lg px-3 py-2 text-sm hover:bg-red-600 hover:text-white transition-all cursor-pointer"
        >
          <option value="" disabled>
            Actions
          </option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </td>
      <td className="px-6 py-5 hidden md:table-cell">
        <button
          onClick={() => navigate(`/groups/${id}/edit`)}
          className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-500 transition"
        >
          Go
        </button>
      </td>
    </tr>
  );
};

export default GroupRow;
