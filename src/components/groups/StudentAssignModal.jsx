import React, { useEffect, useState } from "react";

const StudentAssignModal = ({
  open,
  onClose,
  onSave,
  assignedStudents = [],
  isEditMode = false,
}) => {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  useEffect(() => {
    if (open && !isEditMode) {
      setEnrollmentDate(new Date().toISOString().split("T")[0]); // today
      setSelectedId("");
      setSuccess(false);
    }
  }, [open, isEditMode]);

  const handleSave = () => {
    if (!selectedId || !enrollmentDate) return;

    const student = students.find((s) => s.id === selectedId);
    if (!student) return;

    const newEntry = {
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      enrollmentDate,
    };

    const alreadyAssigned = assignedStudents.some((s) => s.id === student.id);
    const updatedList = alreadyAssigned
      ? assignedStudents.map((s) => (s.id === student.id ? newEntry : s))
      : [...assignedStudents, newEntry];

    onSave(updatedList);
    setSuccess(true);
  };

  if (!open) return null;

  const availableStudents = isEditMode
    ? students
    : students.filter((s) => !assignedStudents.some((a) => a.id === s.id));

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        {!success ? (
          <>
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              {isEditMode ? "Edit Assigned Student" : "Assign Student to Group"}
            </h2>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Select Student
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="">-- Select --</option>
                {availableStudents.length > 0 ? (
                  availableStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.email})
                    </option>
                  ))
                ) : (
                  <option disabled>No students available</option>
                )}
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Enrollment Date
              </label>
              <input
                type="date"
                value={enrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!selectedId || !enrollmentDate}
                className={`px-4 py-2 text-white rounded transition ${
                  !selectedId || !enrollmentDate
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-green-600 font-semibold text-lg">
              Student Assigned Successfully!
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSuccess(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Add Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignModal;
