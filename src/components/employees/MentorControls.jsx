import React, { useState } from "react";
import { FaFilter, FaCalendarAlt } from "react-icons/fa";

const MentorControls = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const toggleStatus = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === status ? "" : status,
    }));
    setShowStatusModal(false);
  };

  const handleDateChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search mentors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <div className="flex gap-4">
        <button
          onClick={() => setShowStatusModal(true)}
          className="border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white transition px-4 py-2 rounded-md"
        >
          <FaFilter className="inline-block mr-2" /> Filter
        </button>
        <button
          onClick={() => setShowDateModal(true)}
          className="border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white transition px-4 py-2 rounded-md"
        >
          <FaCalendarAlt className="inline-block mr-2" /> Date
        </button>
      </div>

      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 space-y-4">
            <h2 className="text-lg font-semibold">Filter by Status</h2>
            {["Active", "Inactive"].map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className="w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition px-4 py-2 rounded"
              >
                {status}
              </button>
            ))}
            <button
              onClick={() => toggleStatus("")}
              className="w-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition px-4 py-2 rounded"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      {showDateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 space-y-4">
            <h2 className="text-lg font-semibold">Filter by Date Joined</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={filters.dateFrom || ""}
                onChange={(e) => handleDateChange("dateFrom", e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
              />
              <input
                type="date"
                value={filters.dateTo || ""}
                onChange={(e) => handleDateChange("dateTo", e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    dateFrom: "",
                    dateTo: "",
                  }));
                  setShowDateModal(false);
                }}
                className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Clear
              </button>
              <button
                onClick={() => setShowDateModal(false)}
                className="border border-red-600 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorControls;
