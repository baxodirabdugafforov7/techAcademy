import React, { useState, useEffect } from "react";
import GroupRow from "./GroupsRow";
import { FaSort } from "react-icons/fa";

const GroupsTable = ({ groups }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
    setMentors(JSON.parse(localStorage.getItem("mentors")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedGroups = [...groups].sort((a, b) => {
    const valA = (a?.[sortField] || "").toString().toLowerCase();
    const valB = (b?.[sortField] || "").toString().toLowerCase();
    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const renderHeader = (label, field, width, hideOnSmall = false) => (
    <th
      onClick={() => handleSort(field)}
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider select-none cursor-pointer ${width} ${
        hideOnSmall ? "hidden md:table-cell" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        {label}
        <FaSort className="text-gray-400 text-xs" />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto w-full border border-gray-200 rounded shadow-sm">
      <table className="w-full table-fixed bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            {renderHeader("Name", "name", "w-[240px]")}
            {renderHeader("Course", "course", "w-[240px]")}
            {renderHeader("Mentor", "mentorId", "w-[240px]")}
            {renderHeader("Days", "days", "w-[220px]")}
            {renderHeader("Time", "time", "w-[200px]")}
            {renderHeader("Price", "price", "w-[200px]", true)}
            {renderHeader("Classroom", "classroom", "w-[160px]", true)}
            {renderHeader("Students", "studentIds", "w-[160px]", true)}
            {renderHeader("Start Date", "startDate", "w-[160px]", true)}
            {renderHeader("Status", "status", "w-[140px]", true)}
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[120px] hidden md:table-cell">
              Actions
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[100px] hidden md:table-cell">
              Go
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {(sortField ? sortedGroups : groups).map((group) => (
            <GroupRow
              key={group.id}
              group={group}
              courses={courses}
              mentors={mentors}
              students={students}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsTable;
