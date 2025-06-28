import React from "react";

const MentorForm = ({
  mentor,
  setMentor,
  setSelectedGroup,
  setShowModal,
  isEditMode = false,
  assignedGroups = [],
}) => {
  const handleInputChange = (field, value) => {
    setMentor({ ...mentor, [field]: value });
  };

  const handleViewGroup = (group) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  const inputClass =
    "w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all";

  return (
    <div className="space-y-10 border border-gray-300 p-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={mentor.fullName || ""}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course Count</label>
          <input
            type="number"
            min="0"
            value={mentor.courses || ""}
            onChange={(e) =>
              handleInputChange("courses", e.target.value.replace(/^0+(?!$)/, ""))
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telephone</label>
          <input
            type="tel"
            value={mentor.telephone || ""}
            onChange={(e) => handleInputChange("telephone", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={mentor.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Joined</label>
          <input
            type="date"
            value={mentor.dateJoined || ""}
            onChange={(e) => handleInputChange("dateJoined", e.target.value)}
            className={inputClass}
          />
        </div>

        {isEditMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Groups Assigned</label>
            <input
              type="text"
              value={assignedGroups.length}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 text-gray-600 transition-all"
            />
          </div>
        )}
      </div>

      {isEditMode && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Assigned Groups</h3>
          {assignedGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assignedGroups.map((group) => {
                const course = JSON.parse(localStorage.getItem("courses"))?.find(
                  (c) => c.id === group.courseId
                );
                return (
                  <div
                    key={group.id}
                    className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
                  >
                    <p className="font-medium text-red-600">{group.name}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Course:</span>{" "}
                      {course?.name || "Unknown"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Students:</span>{" "}
                      {group.studentIds?.length || 0}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Time:</span> {group.time}
                    </p>
                    <button
                      onClick={() => handleViewGroup(group)}
                      className="mt-3 text-sm px-3 py-1 border border-red-600 text-red-600 bg-white rounded hover:bg-red-600 hover:text-white transition"
                    >
                      View Group
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50 text-center text-gray-500 italic">
              No groups currently assigned to this mentor
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            value={mentor.country || ""}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={mentor.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            type="text"
            value={mentor.zipCode || ""}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={mentor.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {isEditMode && (
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={mentor.status || ""}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className={inputClass}
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default MentorForm;
