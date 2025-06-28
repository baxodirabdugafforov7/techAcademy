import React from "react";
import MentorRow from "./MentorRow";
import { FaSort } from "react-icons/fa";

const MentorTable = ({ mentors, handleSort, refreshMentors }) => {
  const renderHeader = (label, field) => (
    <th
      onClick={() => handleSort(field)}
      className="px-6 py-3 cursor-pointer select-none hover:text-red-600 transition-colors"
    >
      <div className="flex items-center gap-1">
        {label}
        <FaSort className="text-gray-400 text-xs" />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            {renderHeader("Name", "fullName")}
            {renderHeader("Course", "courses")}
            {renderHeader("Date Joined", "mentorName")}
            {renderHeader("Members", "groups")}
            {renderHeader("Status", "status")}
            <th className="px-6 py-3">Actions</th>
            <th className="px-6 py-3">Go</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {mentors.map((mentor) => (
            <MentorRow
              key={mentor.id}
              mentor={mentor}
              refreshMentors={refreshMentors}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentorTable;
