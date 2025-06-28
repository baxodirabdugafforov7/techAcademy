import React from "react";
import StudentRow from "./StudentRow";
import { FaSort } from "react-icons/fa";

const StudentTable = ({ students, onSort, sortKey, sortOrder }) => {
  const renderHeader = (label, field) => {
    const isActive = sortKey === field;
    const arrow = sortOrder === "asc" ? "↑" : "↓";

    return (
      <th
        onClick={() => onSort(field)}
        className="px-6 py-3 cursor-pointer select-none whitespace-nowrap"
      >
        <div className="flex items-center gap-1">
          {label}
          <FaSort
            className={`text-gray-400 ${isActive ? "text-black" : ""}`}
            title={isActive ? `Sorted ${sortOrder}` : "Click to sort"}
          />
          {isActive && <span>{arrow}</span>}
        </div>
      </th>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {renderHeader("Student", "fullName")}
            {renderHeader("Course", "course")}
            {renderHeader("Enrolled", "enrolled")}
            {renderHeader("Price", "price")}
            {renderHeader("Status", "status")}
            <th className="px-6 py-3 whitespace-nowrap">Actions</th>
            <th className="px-6 py-3 whitespace-nowrap">Go</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {students.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
