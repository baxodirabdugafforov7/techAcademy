import React from "react";
import { useNavigate } from "react-router-dom";

const GroupsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Groups</h2>
        <p className="text-sm text-gray-500">Manage all training groups and their details</p>
      </div>
      <button
        onClick={() => navigate("/groups/add")}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 text-sm transition"
      >
        + Add Group
      </button>
    </div>
  );
};

export default GroupsHeader;
